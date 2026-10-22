import { styled } from '@stitches/react';
import * as Slider from '@radix-ui/react-slider';

export const SliderTrack = styled(Slider.Track, {
  backgroundColor: '$white',
  position: 'relative',
  flexGrow: 1,
  borderRadius: '9999px',
  border: '1px solid $primary',
  height: 10,
});
