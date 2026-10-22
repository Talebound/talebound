import React, { useEffect, useMemo } from 'react';
import ImageModalContent, { ImageModalContentProps } from './ImageModalContent';
import Modal from '../Modal/Modal';
import { PbImage } from '../../generated/api-types/data-contracts';
import { ImageVariant } from '../../utils/images/imageUtils';
import { useDispatch } from 'react-redux';
import { resetImageModalState, setSelectedImage, setSelectedVariant } from './imageModalSlice';

interface ImageModalProps extends ImageModalContentProps {
  trigger: React.ReactNode;
  open?: boolean;
  defaultImage?: PbImage;
  defaultVariant?: ImageVariant;
}

const ImageModal: React.FC<ImageModalProps> = ({
  trigger,
  open,
  setOpen,
  defaultImage,
  defaultVariant,
  ...contentProps
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      if (defaultImage) {
        dispatch(setSelectedImage(defaultImage));
      }
      if (defaultVariant) {
        dispatch(setSelectedVariant(defaultVariant));
      }
    } else if (!open) {
      dispatch(resetImageModalState());
    }
  }, [defaultImage, defaultVariant, dispatch, open]);

  const content = useMemo(
    () => <ImageModalContent setOpen={setOpen} {...contentProps} />,
    [contentProps, setOpen],
  );

  return <Modal open={open} onOpenChange={setOpen} size="xl" trigger={trigger} content={content} />;
};

export default ImageModal;
