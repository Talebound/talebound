import { styled } from '../../../styles/stitches.config';

import { BIG_IMG_COEF, SUB_ICON_SIZE } from './utilsAspectDiamond';

export const AspectDiamondIcon = styled('img', {
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: `${SUB_ICON_SIZE}px`,
  height: `${SUB_ICON_SIZE}px`,
  transform: ' translate(-50%, -50%) rotate(-45deg)',
  opacity: 0.9,

  '&:hover': {
    opacity: 1,
  },

  variants: {
    large: {
      true: {
        width: `${SUB_ICON_SIZE * BIG_IMG_COEF}px`,
        height: `${SUB_ICON_SIZE * BIG_IMG_COEF}px`,
      },
    },
  },
});
