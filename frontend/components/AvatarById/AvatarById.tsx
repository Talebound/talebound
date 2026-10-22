import React, { Suspense } from 'react';
import Avatar, { AvatarProps } from '../Avatar/Avatar';
import { useImage } from '../../hooks/useImage';

interface AvatarByIdProps extends Omit<AvatarProps, 'url'> {
  imageId?: number;
}

const AvatarContent: React.FC<AvatarByIdProps> = ({ imageId, ...rest }) => {
  const { image } = useImage(imageId);

  return <Avatar {...rest} url={image?.url} />;
};

const AvatarById: React.FC<AvatarByIdProps> = ({ imageId, ...rest }) => (
  <Suspense fallback={<Avatar {...rest} loading />}>
    <AvatarContent imageId={imageId} {...rest} />
  </Suspense>
);

export default AvatarById;
