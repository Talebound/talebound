import React, { useCallback } from 'react';
import { ImageVariant } from '../../utils/images/imageUtils';
import { Button } from '../Button/Button';

interface ImageVariantButtonsProps {
  selected?: boolean;
  variant: ImageVariant;
  onClick: (variant: ImageVariant) => void;
}

const ImageVariantButton: React.FC<ImageVariantButtonsProps> = ({ selected, variant, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(variant);
  }, [onClick, variant]);

  return (
    <Button color={selected ? 'primaryFill' : 'primaryOutline'} key={variant} onClick={handleClick}>
      {variant}
    </Button>
  );
};

export default ImageVariantButton;
