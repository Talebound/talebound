import { styled } from '../../../styles/stitches.config';

export const AspectDiamondText = styled('div', {
  textAlign: 'center',

  position: 'absolute',
  width: '100%',
  left: 0,
  top: '50%',
  transform: ' translate(-2px, -50%) rotate(-45deg)',
  opacity: 0.9,
  fontSize: '$xs',
  color: '$primary800',
  fontStyle: 'italic',

  '&:hover': {
    opacity: 1,
  },
});
