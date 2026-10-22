import React from 'react';
import { Rate } from 'antd';
import { styled } from '../../styles/stitches.config';
import { BsDiamondFill } from 'react-icons/bs';

const StyledRating = styled(Rate, {
  color: '$primary800',
  li: {
    marginBottom: 0,
  },
});

interface RatingProps {
  defaultValue?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

const ratingIcon = <BsDiamondFill />;

const Rating: React.FC<RatingProps> = ({ defaultValue, onChange, disabled }) => {
  return (
    <StyledRating
      allowHalf
      allowClear
      disabled={disabled}
      onChange={onChange}
      character={ratingIcon}
      defaultValue={defaultValue}
    />
  );
};

export default Rating;
