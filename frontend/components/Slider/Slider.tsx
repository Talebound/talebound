import React, { useEffect, useState } from 'react';
import { SliderTrack } from '../../components-radix-ui/Slider/SliderTrack';
import { SliderRange } from '../../components-radix-ui/Slider/SliderRange';
import { SliderThumb } from '../../components-radix-ui/Slider/SliderThumb';
import { SliderRoot } from '../../components-radix-ui/Slider/SliderRoot';
import { SliderProps } from '@radix-ui/react-slider';
import { styled } from '../../styles/stitches.config';

const ValueWrapper = styled('div', {
  width: '70px',
  minWidth: '70px',
  paddingLeft: '16px',
});

interface SliderComponentProps extends SliderProps {
  showValue?: boolean;
  suffix?: string;
}

const Slider: React.FC<SliderComponentProps> = ({ showValue, suffix, ...otherProps }) => {
  const [value, setValue] = useState<SliderProps['value']>(otherProps.defaultValue);

  useEffect(() => {
    if (otherProps.defaultValue) setValue(otherProps.defaultValue);
  }, [otherProps.defaultValue]);

  return (
    <>
      <SliderRoot value={value} onValueChange={setValue} {...otherProps}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb aria-label="Volume" />
      </SliderRoot>
      {showValue && (
        <ValueWrapper>
          {value?.[0] ?? 0}
          {suffix ?? ''}
        </ValueWrapper>
      )}
    </>
  );
};

export default Slider;
