import { styled } from '../../../styles/stitches.config';

export const UserDiamond = styled('div', {
  display: 'flex',
  position: 'absolute',
  top: 'calc(50% + 25px)',
  left: '50%',
  overflow: 'hidden',
  outline: '2px solid $primary800',

  transition: 'transform 0.2s ease-in-out',
  transform: 'translate(-50%, -50%) rotate(45deg)',

  '&:hover': {
    transform: 'translate(-50%, -50%) rotate(45deg) scale(1.2)',
  },

  ['img']: {
    width: '75px',
    height: '75px',
    transform: 'scale(1.5) rotate(-45deg)',
  },
});
