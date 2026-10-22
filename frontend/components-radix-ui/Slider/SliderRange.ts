import { styled } from '@stitches/react';
import * as Slider from '@radix-ui/react-slider';

export const SliderRange = styled(Slider.Range, {
  position: 'absolute',
  backgroundColor: '$primary500',
  borderRadius: '9999px',
  height: '100%',
});
