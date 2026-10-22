import React from 'react';
import { ImageVariant, imageVariantArray } from '../../utils/images/imageUtils';
import { Row } from '../Flex/Flex';
import ImageVariantButton from './ImageVariantButton';

interface ImageVariantButtonsProps {
  selected?: ImageVariant;
  onClick: (variant: ImageVariant) => void;
}

const ImageVariantButtons: React.FC<ImageVariantButtonsProps> = ({ selected, onClick }) => {
  return (
    <Row gap="sm" wrap>
      {imageVariantArray.map((variant) => {
        return (
          <ImageVariantButton
            key={variant}
            variant={variant}
            selected={selected === variant}
            onClick={onClick}
          />
        );
      })}
    </Row>
  );
};

export default ImageVariantButtons;
