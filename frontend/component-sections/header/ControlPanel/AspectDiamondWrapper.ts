import { styled } from '../../../styles/stitches.config';
import Stitches from '@stitches/react';
import { BIG_IMG_COEF, IMG_SIZE, ON_HOVER_SCALE_SIZE, SUB_ICON_SIZE } from './utilsAspectDiamond';

const transformByPosition = {
  middle: `translate(-50%, -50%) rotate(45deg)`,
  top: `translateY(calc(-50% - ${SUB_ICON_SIZE / 4}px)) rotate(45deg)`,
  bottom: `translateY(calc(50% + ${SUB_ICON_SIZE / 4}px)) rotate(45deg)`,
  left: `translateX(calc(-50% - ${SUB_ICON_SIZE / 4}px)) rotate(45deg)`,
  right: `translateX(calc(50% + ${SUB_ICON_SIZE / 4}px)) rotate(45deg)`,
};

export const AspectDiamondWrapper = styled('div', {
  position: 'absolute',
  width: `${IMG_SIZE}px`,
  height: `${IMG_SIZE}px`,
  transform: 'rotate(45deg)',
  transition: 'all 0.2s ease-in-out',
  borderRadius: '0%',

  overflow: 'hidden',

  left: `calc(50% - ${SUB_ICON_SIZE / 3 + 2}px)`,
  top: `calc(50% - ${SUB_ICON_SIZE / 3 + 2}px)`,

  '&:hover': {
    transform: 'rotate(45deg) scale(1.3)',
    opacity: 1,
  },

  variants: {
    position: {
      middle: {
        transform: transformByPosition.middle,
        top: '50%',
        left: '50%',
        '&:hover': {
          transform: `${transformByPosition.middle} scale(${ON_HOVER_SCALE_SIZE})`,
        },
      },
      top: {
        transform: transformByPosition.top,
        '&:hover': {
          transform: `${transformByPosition.top} scale(${ON_HOVER_SCALE_SIZE})`,
        },
      },
      bottom: {
        transform: transformByPosition.bottom,
        '&:hover': {
          transform: `${transformByPosition.bottom} scale(${ON_HOVER_SCALE_SIZE})`,
        },
      },
      left: {
        transform: transformByPosition.left,
        '&:hover': {
          transform: `${transformByPosition.left} scale(${ON_HOVER_SCALE_SIZE})`,
        },
      },
      right: {
        transform: transformByPosition.right,
        '&:hover': {
          transform: `${transformByPosition.right} scale(${ON_HOVER_SCALE_SIZE})`,
        },
      },
    },

    x: {
      left: {},
      right: {},
    },

    y: {
      top: {},
      bottom: {},
    },

    large: {
      true: {
        width: `${IMG_SIZE * BIG_IMG_COEF}px`,
        height: `${IMG_SIZE * BIG_IMG_COEF}px`,
      },
    },

    text: {
      true: {
        width: `${IMG_SIZE * BIG_IMG_COEF * 1.3}px`,
        height: `${IMG_SIZE * BIG_IMG_COEF * 1.3}px`,
        border: '1px solid $transparent60',
        backgroundColor: '$transparent30',
      },
    },
  },

  defaultVariants: {
    position: 'middle',
    x: 'left',
    y: 'top',
    large: false,
  },
});

export type AspectDiamondVariants = Stitches.VariantProps<typeof AspectDiamondWrapper>;
