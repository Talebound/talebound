import React, { useCallback, useRef, useState } from 'react';
import { ExpandedUploadImageRequest, useUploadImage } from '../../api/images/useUploadImage';
import { fileInputChanged } from '../../utils/functions/fileInputChanged';
import InputFile from '../InputFile/InputFile';
import { Button } from '../Button/Button';
import Loading from '../Loading/Loading';
import { Col, Row } from '../Flex/Flex';
import ErrorText from '../ErrorText/ErrorText';
import { useAuth } from '../../hooks/useAuth';
import { AxiosResponse } from 'axios';
import { PbImage } from '../../generated/api-types/data-contracts';

interface ImageModalTabUploadProps {
  filename: string;
  imageTypeId: number;
  onUpload: (data: AxiosResponse<PbImage>) => void;
}

const ImageModalTabUpload: React.FC<ImageModalTabUploadProps> = ({
  filename,
  imageTypeId,
  onUpload,
}) => {
  const { user } = useAuth();
  const doUploadImage = useUploadImage();

  const [uploadArgs, setUploadArgs] = useState<ExpandedUploadImageRequest>();
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    async (event) =>
      fileInputChanged(event, (base64Data) =>
        setUploadArgs({
          filename,
          data: base64Data,
          userId: user?.id ?? 0,
          imageTypeId,
        }),
      ),
    [user?.id, filename, imageTypeId],
  );

  const handleUpload = useCallback(() => {
    if (!uploadArgs) return;
    doUploadImage.mutate(uploadArgs, {
      onSuccess: onUpload,
    });

    setUploadArgs(undefined);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [doUploadImage, uploadArgs, onUpload]);

  return (
    <Col gap="md">
      <InputFile
        onChange={onChange}
        multiple={false}
        showBorder={false}
        showTitle={false}
        ref={inputRef}
        disabled={doUploadImage.isPending}
      />
      <Row gap="sm">
        <Button onClick={handleUpload} disabled={doUploadImage.isPending}>
          {doUploadImage.isPending ? <Loading color="currentColor" size="xs" /> : 'Upload'}
        </Button>
        <ErrorText error={doUploadImage.error} />
      </Row>
    </Col>
  );
};

export default ImageModalTabUpload;
