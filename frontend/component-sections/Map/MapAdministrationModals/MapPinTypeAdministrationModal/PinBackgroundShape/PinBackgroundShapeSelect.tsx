import React from 'react';
import { PbPinShape } from '../../../../../generated/api-types/data-contracts';
import { iterablePbPinShapes } from './pinBackgroundShapeLib';
import MapPinBackground from './MapPinBackground';
import { Row } from '../../../../../components/Flex/Flex';
import { styled } from '../../../../../styles/stitches.config';

const PinWrapper = styled('div', {
  border: '2px solid transparent',
  padding: '$xs',

  variants: {
    selected: {
      true: {
        border: '2px solid $primary',
        backgroundColor: '2px solid $primary200',
      },
    },
    optionNone: {
      true: {
        border: '2px solid $white700',
      },
    },
  },
});

interface PinBackgroundShapeSelectProps {
  selected: PbPinShape;
  onChange: (shape: PbPinShape) => void;
}

const PinBackgroundShapeSelect: React.FC<PinBackgroundShapeSelectProps> = ({
  selected,
  onChange,
}) => {
  return (
    <Row gap="sm" fullWidth wrap>
      {iterablePbPinShapes.map((x) => (
        <PinWrapper
          key={x}
          onClick={() => onChange(x)}
          selected={selected === x}
          optionNone={x === PbPinShape.NONE && selected !== x}
        >
          {x === PbPinShape.NONE ? (
            'no background'
          ) : (
            <MapPinBackground backgroundColor="#d9d9d9" borderColor="black" shape={x} width={20} />
          )}
        </PinWrapper>
      ))}
    </Row>
  );
};

export default PinBackgroundShapeSelect;
