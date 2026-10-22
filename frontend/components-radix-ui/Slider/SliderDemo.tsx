import React from 'react';
import { SliderRoot } from './SliderRoot';
import { SliderTrack } from './SliderTrack';
import { SliderRange } from './SliderRange';
import { SliderThumb } from './SliderThumb';

/** https://www.radix-ui.com/primitives/docs/components/slider */
const SliderDemo = () => (
  <form>
    <SliderRoot defaultValue={[50]} max={100} step={1}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb aria-label="Volume" />
    </SliderRoot>
  </form>
);

export default SliderDemo;
