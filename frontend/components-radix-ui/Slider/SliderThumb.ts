import { styled } from '@stitches/react';
import * as Slider from '@radix-ui/react-slider';

export const SliderThumb = styled(Slider.Thumb, {
  display: 'block',
  width: 20,
  height: 20,
  backgroundColor: '$primary500',
  border: '1px solid $primary500',
  boxShadow: `0 2px 10px $primary900`,
  borderRadius: 10,
  '&:hover': { backgroundColor: `$primary300` },
  '&:focus': { outline: 'none', boxShadow: `0 0 0 5px $primary500` },
});
