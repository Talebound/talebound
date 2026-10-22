import { styled } from '../../../../styles/stitches.config';

export const Resizer = styled('div', {
  position: 'absolute',
  // These handles are portalled to body, including when the editor is in a modal.
  zIndex: 200,
  pointerEvents: 'auto',
});
