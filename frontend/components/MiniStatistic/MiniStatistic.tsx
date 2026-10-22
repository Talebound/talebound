import React from 'react';
import { Text } from '../Typography/Text';
import { styled } from '../../styles/stitches.config';
import { Col } from '../Flex/Flex';
import Tooltip from '../Tooltip/Tooltip';

const MiniStatisticWrapper = styled(Col, {
  padding: '$sm',
  backgroundColor: '$transparent60',
  borderRadius: '$md',
  fontSize: '$md',
  width: '100px',
  alignItems: 'center',
  justifyContent: 'center',
});

const MiniStatisticNumber = styled(Col, {
  padding: '$xs',
  fontSize: '$2xl',
  backgroundColor: '$transparent60',
  width: '60px',
  height: '60px',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    compact: {
      true: {
        fontSize: '$lg',
        width: '40px',
        height: '40px',
      },
    },
  },
});

interface MiniStatisticProps {
  title?: string;
  value?: number;
  compact?: boolean;
}

const MiniStatistic: React.FC<MiniStatisticProps> = ({ title, value, compact }) => {
  if (compact) {
    return (
      <Tooltip content={title}>
        <MiniStatisticNumber circle compact={compact}>
          {value}
        </MiniStatisticNumber>
      </Tooltip>
    );
  }

  return (
    <MiniStatisticWrapper gap="sm">
      <Text>{title}</Text>
      <MiniStatisticNumber circle>{value}</MiniStatisticNumber>
    </MiniStatisticWrapper>
  );
};

export default MiniStatistic;
