import { styled } from '../../../styles/stitches.config';

const ICON_SIZE = 25;
const PADDING_SIZE = 3;

export const AspectBoxIcon = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  color: '$primary700',
  opacity: 0.5,

  alignItems: 'center',
  justifyContent: 'center',

  transition: 'all 0.2s ease-in-out',

  width: `${ICON_SIZE}px`,
  height: `${ICON_SIZE}px`,

  variants: {
    x: {
      left: {
        left: `${PADDING_SIZE}px`,
      },
      right: {
        right: `${PADDING_SIZE}px`,
      },
    },
    y: {
      top: {
        top: `${PADDING_SIZE}px`,
      },
      bottom: {
        bottom: `${PADDING_SIZE}px`,
      },
    },
  },
});
