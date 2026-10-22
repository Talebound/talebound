import { styled } from '../../styles/stitches.config';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

export const AvatarImage = styled(AvatarPrimitive.Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
});
