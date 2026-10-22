import React, { useMemo } from 'react';
import { AvatarRoot } from '../../components-radix-ui/Avatar/AvatarRoot';
import { AvatarImage } from '../../components-radix-ui/Avatar/AvatarImage';
import { AvatarFallback } from '../../components-radix-ui/Avatar/AvatarFallback';
import { AvatarSize, AvatarType, emptyUrlByType } from './avatarLib';
import { ImageVariant, imageModifyVariant } from '../../utils/images/imageUtils';

export interface AvatarProps {
  url?: string;
  loading?: boolean;
  type?: AvatarType;
  size?: AvatarSize;
  fallbackText?: string;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
  url,
  loading,
  type = 'unknown',
  size = 'lg',
  fallbackText,
  onClick,
}) => {
  const optimizedUrl = useMemo(() => {
    if (!url) return undefined;

    switch (size) {
      case 'xs':
      case 'sm':
        return imageModifyVariant(url, ImageVariant['30x30']);
      case 'md':
      case 'lg':
        return imageModifyVariant(url, ImageVariant['100x100']);
      case 'xl':
        return imageModifyVariant(url, ImageVariant['150x150']);
      case '2xl':
        return imageModifyVariant(url, ImageVariant['200x200']);
    }
  }, [url, size]);

  return (
    <AvatarRoot clickable={!!onClick} onClick={onClick} size={size} loading={loading}>
      <AvatarImage src={optimizedUrl ?? emptyUrlByType[type]} alt={`Avatar ${fallbackText}`} />
      {fallbackText && <AvatarFallback delayMs={600}>{fallbackText}</AvatarFallback>}
    </AvatarRoot>
  );
};

export default Avatar;
