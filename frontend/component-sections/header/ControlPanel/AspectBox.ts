import { styled } from '../../../styles/stitches.config';
import { AspectBoxIcon } from './AspectBoxIcon';

const BOXIK_SIZE = 115;
const SQUARE_SIZE = 250;
const GAP_SIZE = SQUARE_SIZE / 2 - BOXIK_SIZE;
const MENU_HEIGHT = 50;
const BORDER_RADIUS = '75%';

export const AspectBox = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  position: 'absolute',
  backgroundColor: '$transparent0',

  padding: '$sm',

  alignItems: 'center',
  justifyContent: 'center',

  transition: 'all 0.2s ease-in-out',

  width: `${BOXIK_SIZE}px`,
  height: `${BOXIK_SIZE}px`,

  '&:hover': {
    borderRadius: '0px',
    width: `${BOXIK_SIZE + GAP_SIZE}px`,
    height: `${BOXIK_SIZE + GAP_SIZE}px`,

    [`& ${AspectBoxIcon}`]: {
      opacity: 1,
    },
  },

  variants: {
    x: {
      left: {
        left: `${GAP_SIZE}px`,
        '&:hover': {
          left: '0px',
        },
      },
      right: {
        right: `${GAP_SIZE}px`,
        '&:hover': {
          right: '0px',
        },
      },
    },
    y: {
      top: {
        top: `${MENU_HEIGHT + GAP_SIZE}px`,
        '&:hover': {
          top: `${MENU_HEIGHT}px`,
        },
      },
      bottom: {
        bottom: `${GAP_SIZE}px`,
        '&:hover': {
          bottom: '0px',
        },
      },
    },
  },

  compoundVariants: [
    {
      x: 'left',
      y: 'top',
      css: {
        borderTopLeftRadius: BORDER_RADIUS,
      },
    },
    {
      x: 'left',
      y: 'bottom',
      css: {
        borderBottomLeftRadius: BORDER_RADIUS,
      },
    },
    {
      x: 'right',
      y: 'bottom',
      css: {
        borderBottomRightRadius: BORDER_RADIUS,
      },
    },
    {
      x: 'right',
      y: 'top',
      css: {
        borderTopRightRadius: BORDER_RADIUS,
      },
    },
  ],
});
