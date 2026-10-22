import React from 'react';
import { MapPinBackgroundProps } from '../MapPinBackground';

export const SvgCircle: React.FC<Omit<MapPinBackgroundProps, 'shape'>> = ({
  width = 30,
  backgroundColor = 'white',
  borderColor = 'black',
  borderWidth = 4,
}) => (
  <svg
    overflow="visible"
    width={width}
    height={width}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="15"
      cy="15"
      r="14.5"
      style={{ fill: backgroundColor, stroke: borderColor, strokeWidth: borderWidth }}
    />
  </svg>
);
