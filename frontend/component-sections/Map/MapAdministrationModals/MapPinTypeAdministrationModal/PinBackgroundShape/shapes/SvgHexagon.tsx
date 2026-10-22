import React from 'react';
import { MapPinBackgroundProps } from '../MapPinBackground';

export const SvgHexagon: React.FC<Omit<MapPinBackgroundProps, 'shape'>> = ({
  width = 30,
  backgroundColor = 'white',
  borderColor = 'black',
  borderWidth = 4,
}) => (
  <svg
    overflow="visible"
    width={width}
    viewBox="0 0 32 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.5 1H8.5L1 14L8.5 27.5H23.5L31 14L23.5 1Z"
      style={{ fill: backgroundColor, stroke: borderColor, strokeWidth: borderWidth }}
    />
  </svg>
);
