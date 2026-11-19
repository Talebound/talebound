import React, { useCallback, useRef, useState } from 'react';
import { Col } from '../../components/Flex/Flex';
import InputFile from '../../components/InputFile/InputFile';
import { Button } from '../../components/Button/Button';
import ContentSection from '../../components/ContentSection/ContentSection';
import { UploadUserAvatarRequest, useUploadUserAvatar } from '../../api/users/useUploadUserAvatar';
import { useAuth } from '../../hooks/useAuth';
import { updateUser } from '../../utils/auth/userSlice';
import { useAppDispatch } from '../../store/hooks';
import AvatarById from '../../components/AvatarById/AvatarById';
import { imageAdapterSlice } from '../../adapters/ImageAdapter';
import ErrorText from '../../components/ErrorText/ErrorText';
import { fileInputChanged } from '../../utils/functions/fileInputChanged';

const AvatarChange: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const [uploadArgs, setUploadArgs] = useState<UploadUserAvatarRequest>();
  const [reading, setReading] = useState(false);
  const [readError, setReadError] = useState<unknown>();
  const inputRef = useRef<HTMLInputElement>(null);
  const selectionVersion = useRef(0);
  const uploading = useRef(false);

  const doUploadAvatar = useUploadUserAvatar({
    onSuccess: (data) => {
      if (data.data.image) dispatch(imageAdapterSlice.actions.upsertImage(data.data.image));
      dispatch(updateUser({ imgId: data.data.image?.id }));
      setUploadArgs(undefined);
      if (inputRef.current) inputRef.current.value = '';
    },
    onSettled: () => {
      uploading.current = false;
    },
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    async (event) => {
      const version = ++selectionVersion.current;
      setUploadArgs(undefined);
      setReadError(undefined);
      setReading(true);
      try {
        await fileInputChanged(event, (data) => {
          if (version === selectionVersion.current && user?.id)
            setUploadArgs({ userId: user.id, data });
        });
      } catch (error) {
        if (version === selectionVersion.current) setReadError(error);
      } finally {
        if (version === selectionVersion.current) setReading(false);
      }
    },
    [user?.id],
  );

  const disabled =
    !uploadArgs?.data ||
    !user?.id ||
    uploadArgs.userId !== user.id ||
    reading ||
    doUploadAvatar.isPending;
  const handleUpload = () => {
    if (disabled || !uploadArgs || uploading.current) return;
    uploading.current = true;
    doUploadAvatar.mutate(uploadArgs);
  };

  return (
    <ContentSection header="Change avatar" direction="row" justifyContent="space-between">
      <Col gap="md">
        <InputFile
          onChange={onChange}
          multiple={false}
          showBorder={false}
          showTitle={false}
          ref={inputRef}
          disabled={doUploadAvatar.isPending}
        />
        <Button onClick={handleUpload} disabled={disabled} loading={doUploadAvatar.isPending}>
          Upload
        </Button>
        <ErrorText error={readError || doUploadAvatar.error} />
      </Col>
      <AvatarById size="xl" type="user" imageId={user?.imgId} />
    </ContentSection>
  );
};

export default AvatarChange;
