import { styled } from '../../styles/stitches.config';

export const RightSlot = styled('div', {
  marginLeft: 'auto',
  paddingLeft: 20,
  color: '$primary800',
  '[data-highlighted] > &': { color: '$white' },
  '[data-disabled] &': { color: '$primary3200' },
});
