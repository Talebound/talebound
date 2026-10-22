import { AspectDiamondVariants } from './AspectDiamondWrapper';

export const IMG_SIZE = 30;
export const SUB_ICON_SIZE = Math.sqrt(2 * IMG_SIZE ** 2);
export const BIG_IMG_COEF = 1.5;
export const ON_HOVER_SCALE_SIZE = 1.2;

export type AspectDiamondX = 'left' | 'right';
export type AspectDiamondY = 'top' | 'bottom';

export const getAspectDiamondPosition = (
  index: number,
  totalCount: number,
  x: AspectDiamondX,
  y: AspectDiamondY,
): AspectDiamondVariants['position'] => {
  if (totalCount === 1) return 'middle';

  const obj: Record<
    AspectDiamondY,
    Record<AspectDiamondX, Record<number, AspectDiamondVariants['position']>>
  > = {
    top: {
      left: {
        1: 'right',
        2: 'bottom',
        3: 'left',
        4: 'top',
      },
      right: {
        1: 'left',
        2: 'bottom',
        3: 'right',
        4: 'top',
      },
    },
    bottom: {
      left: {
        1: 'right',
        2: 'top',
        3: 'left',
        4: 'bottom',
      },
      right: {
        1: 'left',
        2: 'top',
        3: 'right',
        4: 'bottom',
      },
    },
  };

  return obj[y][x][index] ?? 'middle';
};

export const ASPECT_DIAMOND_TEMP_IMAGES = [
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/86a41b17-730a-49ea-3cab-fd42467f7100/100x100',
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/b5bca192-5a78-49d3-869d-e259f1b75400/100x100',
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/69087495-bcd1-4545-69f0-62d828473a00/100x100',
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/b9edebce-acd8-4ea6-b0ad-89e9e0208300/100x100',
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/d305d9d3-e872-43ee-2eef-6d64aedb6100/100x100',
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/6e768a22-f80e-4796-a4f9-19e201abbd00/100x100',
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/50ca6722-b6a6-49dc-3a85-8ef2e6dbc500/100x100',
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/30d2be2c-a865-46c2-0ad6-7442c6768900/100x100',
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/4caa12fb-8133-4480-27ed-f60116185f00/100x100',
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/d626ba63-6040-418d-9c64-9c9548812f00/100x100',
];
