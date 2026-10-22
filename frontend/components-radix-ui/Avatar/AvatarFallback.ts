import { styled } from '../../styles/stitches.config';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

export const AvatarFallback = styled(AvatarPrimitive.Fallback, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$white',
  color: '$primary800',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 600,
});
