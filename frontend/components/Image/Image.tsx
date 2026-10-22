import React, { useCallback } from 'react';
import { PbImage } from '../../generated/api-types/data-contracts';
import { ImageVariant } from '../../utils/images/imageUtils';
import { styled } from '../../styles/stitches.config';

const StyledImage = styled('img', {
  variants: {
    selected: {
      true: {
        border: '3px solid $primary',
      },
      false: {
        border: '3px solid transparent',
      },
    },
  },
});

interface ImageProps {
  image: PbImage;
  onClick: (image: PbImage) => void;
  variant: ImageVariant;
  selected?: boolean;
}

const Image: React.FC<ImageProps> = ({ image, onClick, variant, selected }) => {
  const handleClick = useCallback(() => (onClick ? onClick(image) : undefined), [image, onClick]);

  return (
    <StyledImage
      alt={image.name}
      src={`${image.baseUrl}/${variant}`}
      onClick={handleClick}
      selected={selected}
    />
  );
};

export default Image;
