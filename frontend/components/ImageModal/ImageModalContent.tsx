import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { PbImage } from '../../generated/api-types/data-contracts';
import { styled } from '../../styles/stitches.config';
import { ReduxState } from '../../store';
import { ImageVariant, isTaleboundCloudflareImage } from '../../utils/images/imageUtils';
import { Button } from '../Button/Button';
import { Col, Row } from '../Flex/Flex';
import ImageModalTabUpload from './ImageModalTabUpload';
import ImageModalTabYourImages from './ImageModalTabYourImages';
import { TitleH4 } from '../Typography/Title';
import ImageVariantButtons from '../ImageVariantButtons/ImageVariantButtons';
import { setSelectedImage, setSelectedVariant } from './imageModalSlice';

enum ImageModalTabs {
  Upload,
  YourImages,
}

export interface ImageModalContentProps {
  setOpen: (v: boolean) => void;
  onSubmit: (image: PbImage | undefined, selectedVariant: ImageVariant) => void;
  uploadedFilename: string;
  uploadedImageTypeId: number;
  isNullable?: boolean;
}

const PreviewImage = styled('img', {
  maxWidth: '1000px',
});

const ImageModalContent: React.FC<ImageModalContentProps> = ({
  setOpen,
  onSubmit,
  uploadedFilename,
  uploadedImageTypeId,
  isNullable = false,
}) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = React.useState(ImageModalTabs.Upload);
  const selectedImage = useSelector((state: ReduxState) => state.imageModal.selectedImage);
  const selectedVariant = useSelector((state: ReduxState) => state.imageModal.selectedVariant);
  const [isCloudflareImage, setIsCloudflareImage] = React.useState(false);

  useEffect(() => {
    setIsCloudflareImage(isTaleboundCloudflareImage(selectedImage?.baseUrl ?? ''));
  }, [selectedImage?.baseUrl]);

  const handleTabClick = useCallback((tab: ImageModalTabs) => {
    setActiveTab(tab);
  }, []);

  const handleUploadTabClick = useCallback(
    () => handleTabClick(ImageModalTabs.Upload),
    [handleTabClick],
  );
  const handleYourImagesTabClick = useCallback(
    () => handleTabClick(ImageModalTabs.YourImages),
    [handleTabClick],
  );

  const submitHandler = useCallback(() => {
    if (onSubmit && selectedImage) {
      onSubmit(selectedImage, selectedVariant ?? ImageVariant.original);
    }
    setOpen(false);
  }, [onSubmit, selectedImage, setOpen, selectedVariant]);

  const clearHandler = useCallback(() => {
    if (onSubmit) {
      onSubmit(undefined, ImageVariant.original);
    }
    setOpen(false);
  }, [onSubmit, setOpen]);

  const handleImageChange = useCallback(
    (image: PbImage) => {
      dispatch(setSelectedImage(image));
    },
    [dispatch],
  );

  const handleVariantChange = useCallback(
    (variant: ImageVariant) => {
      dispatch(setSelectedVariant(variant));
    },
    [dispatch],
  );

  // useEffect(() => {
  //   if (selectedImage?.baseUrl) {
  //     if (isTaleboundCloudflareImage(selectedImage.baseUrl) && selectedVariant) {
  //       const newUrl = imageModifyVariant(selectedImage.baseUrl, selectedVariant);
  //       dispatch(updateInlineImagePayload({ src: newUrl }));
  //     }
  //   }
  // }, [selectedVariant, selectedImage?.baseUrl, dispatch]);

  const uploadImageSuccessCallback = useCallback(
    (data: AxiosResponse<PbImage>) => {
      if (data) {
        handleImageChange(data.data);
      }
    },
    [handleImageChange],
  );

  return (
    <Col gap="md" css={{ flexGrow: 1 }} onClick={(e) => e.stopPropagation()}>
      <Row gap="md">
        <Button
          color={activeTab === ImageModalTabs.Upload ? 'primaryFill' : 'primaryOutline'}
          onClick={handleUploadTabClick}
        >
          Upload
        </Button>
        <Button
          color={activeTab === ImageModalTabs.YourImages ? 'primaryFill' : 'primaryOutline'}
          onClick={handleYourImagesTabClick}
        >
          Your images
        </Button>
      </Row>
      <hr />
      <Row gap="md" justifyContent="between" alignItems="start">
        {activeTab === ImageModalTabs.Upload && (
          <ImageModalTabUpload
            onUpload={uploadImageSuccessCallback}
            filename={uploadedFilename}
            imageTypeId={uploadedImageTypeId}
          />
        )}
        {activeTab === ImageModalTabs.YourImages && (
          <ImageModalTabYourImages
            onClick={handleImageChange}
            selectedImageById={selectedImage?.id}
          />
        )}
      </Row>
      <hr />
      {selectedImage?.baseUrl && (
        <Col gap="md" alignSelf="between">
          {isCloudflareImage && (
            <Row gap="md" alignItems="start">
              <TitleH4>Variants ({selectedVariant})</TitleH4>
              <ImageVariantButtons selected={selectedVariant} onClick={handleVariantChange} />
            </Row>
          )}
          <TitleH4>Preview</TitleH4>
          <Row>
            <PreviewImage
              src={`${selectedImage?.baseUrl}/${selectedVariant ?? ImageVariant.original}`}
              alt={`Image from - ${selectedImage?.baseUrl}`}
            />
          </Row>
          <hr />
        </Col>
      )}
      <Row gap="md" alignSelf="end">
        {isNullable && <Button onClick={clearHandler}>Clear image</Button>}
        <Button onClick={submitHandler}>Set image</Button>
      </Row>
    </Col>
  );
};

export default ImageModalContent;
