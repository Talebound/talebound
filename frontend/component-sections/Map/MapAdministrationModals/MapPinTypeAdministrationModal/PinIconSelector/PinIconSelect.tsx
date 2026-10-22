import React from 'react';
import { styled } from '../../../../../styles/stitches.config';
import { iterablePinIcons, PinIconType } from './pinIconLib';
import { Row } from '../../../../../components/Flex/Flex';
import PinIcon from '../PinIcon/PinIcon';

const IconWrapper = styled('div', {
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

interface PinIconSelectProps {
  selected: PinIconType;
  onChange: (shape: PinIconType) => void;
}

const PinIconSelect: React.FC<PinIconSelectProps> = ({ selected, onChange }) => {
  return (
    <Row gap="sm" fullWidth wrap>
      {iterablePinIcons.map((x) => (
        <IconWrapper
          key={x}
          onClick={() => onChange(x)}
          selected={selected === x}
          optionNone={x === '' && selected !== x}
        >
          {x === '' ? 'no icon' : <PinIcon size={24} icon={x} />}
        </IconWrapper>
      ))}
    </Row>
  );
};

export default PinIconSelect;
