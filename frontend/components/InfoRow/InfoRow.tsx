import React from 'react';
import { styled } from '../../styles/stitches.config';

const InfoRowRoot = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$sm',
});

const InfoRowTitle = styled('div', {
  fontSize: '$md',
  fontWeight: '$bold',
});

const InfoRowValue = styled('div', {
  fontSize: '$md',
});

interface InfoRowProps {
  title: string;
  value?: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ title, value = '-' }) => {
  return (
    <InfoRowRoot>
      <InfoRowTitle>{title}</InfoRowTitle>
      <InfoRowValue>{value}</InfoRowValue>
    </InfoRowRoot>
  );
};

export default InfoRow;
