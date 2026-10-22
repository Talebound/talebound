import React from 'react';
import { MapPinBackgroundProps } from '../MapPinBackground';

export const SvgPin: React.FC<Omit<MapPinBackgroundProps, 'shape'>> = ({
  width = 24,
  backgroundColor = 'white',
  borderColor = 'black',
  borderWidth = 4,
}) => (
  <svg
    overflow="visible"
    width={width}
    viewBox="0 0 24 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.5 12.25C23.5 21 12.25 28.5 12.25 28.5C12.25 28.5 1 21 1 12.25C1 9.26631 2.18526 6.40483 4.29505 4.29505C6.40483 2.18526 9.26631 1 12.25 1C15.2337 1 18.0952 2.18526 20.205 4.29505C22.3147 6.40483 23.5 9.26631 23.5 12.25Z"
      style={{ fill: backgroundColor, stroke: borderColor, strokeWidth: borderWidth }}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
