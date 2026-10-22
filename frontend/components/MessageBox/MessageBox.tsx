import { styled } from '../../styles/stitches.config';

export const MessageBox = styled('div', {
  width: '100%',
  fontStyle: 'italic',
  display: 'flex',
  flexDirection: 'row',
  gap: '$sm',
  padding: '$sm',
  borderRadius: '$md',
  backgroundColor: '$tertiary100',
  color: '$tertiary400',
});
