import { ImagePosition } from '../InlineImageNode/InlineImageNode';
import { useSuspenseImage } from './inlineImageComponentLib';
import * as React from 'react';
import { styled } from '../../../../styles/stitches.config';
import Stitches from '@stitches/react';

const StyledLazyImage = styled('img', {
  maxWidth: '100%',
  cursor: 'default',
  display: 'block',

  variants: {
    position: {
      left: {},
      right: {},
      full: {},
    },

    grabbable: {
      true: {
        cursor: 'grab',
      },
    },
  },
});
export type LazyImageVariants = Stitches.VariantProps<typeof StyledLazyImage>;

interface LazyImageProps extends LazyImageVariants {
  altText: string;
  height: 'inherit' | number;
  imageRef: { current: null | HTMLImageElement };
  src: string;
  width: 'inherit' | number;
  position: ImagePosition;
}

export function LazyImage({
  altText,
  imageRef,
  src,
  width,
  height,
  position,
  ...variants
}: LazyImageProps): JSX.Element {
  useSuspenseImage(src);

  return (
    <StyledLazyImage
      src={src}
      alt={altText}
      ref={imageRef}
      data-position={position}
      position={position}
      style={{
        height,
        width,
      }}
      draggable="false"
      {...variants}
    />
  );
}
