import React, { useCallback, useRef, useState } from 'react';
import { Col } from '../../components/Flex/Flex';
import InputFile from '../../components/InputFile/InputFile';
import { Button } from '../../components/Button/Button';
import ContentSection from '../../components/ContentSection/ContentSection';
import { UploadUserAvatarRequest, useUploadUserAvatar } from '../../api/users/useUploadUserAvatar';
import { useAuth } from '../../hooks/useAuth';
import { updateUser } from '../../utils/auth/userSlice';
import { useDispatch } from 'react-redux';
import Avatar from '../../components/Avatar/Avatar';
import Loading from '../../components/Loading/Loading';
import { fileInputChanged } from '../../utils/functions/fileInputChanged';

const AvatarChange: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const doUploadAvatar = useUploadUserAvatar({
    onSuccess: (data) => {
      dispatch(
        updateUser({
          imgId: data.data.image?.id,
          img: data.data.image,
        }),
      );
    },
  });

  const [uploadArgs, setUploadArgs] = useState<UploadUserAvatarRequest>();
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    async (event) =>
      fileInputChanged(event, (base64Data) =>
        setUploadArgs({
          userId: user?.id ?? 0,
          data: base64Data,
        }),
      ),
    [user?.id],
  );

  const handleUpload = useCallback(() => {
    if (!uploadArgs) return;
    doUploadAvatar.mutate(uploadArgs);

    setUploadArgs(undefined);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [doUploadAvatar, uploadArgs]);

  return (
    <ContentSection header="Change avatar" direction="row" justifyContent="space-between">
      <Col gap="md">
        <InputFile
          onChange={onChange}
          multiple={false}
          showBorder={false}
          showTitle={false}
          ref={inputRef}
        />
        <Button onClick={handleUpload}>
          {doUploadAvatar.isPending ? <Loading color="currentColor" size="xs" /> : 'Upload'}
        </Button>
      </Col>
      <Avatar size="xl" type="user" url={user?.img?.url} />
    </ContentSection>
  );
};

export default AvatarChange;
