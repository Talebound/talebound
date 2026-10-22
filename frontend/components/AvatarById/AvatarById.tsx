import React from 'react';
import Avatar, { AvatarProps } from '../Avatar/Avatar';
import { useImage } from '../../hooks/useImage';

interface AvatarByIdProps extends Omit<AvatarProps, 'url'> {
  imageId?: number;
}

const AvatarById: React.FC<AvatarByIdProps> = ({ imageId, ...rest }) => {
  const { image } = useImage(imageId);

  return <Avatar {...rest} url={image?.url} />;
};

export default AvatarById;
