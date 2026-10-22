import React from 'react';
import { MapPinBackgroundProps } from '../MapPinBackground';

export const SvgOctagon: React.FC<Omit<MapPinBackgroundProps, 'shape'>> = ({
  width = 30,
  backgroundColor = 'white',
  borderColor = 'black',
  borderWidth = 4,
}) => (
  <svg
    overflow="visible"
    width={width}
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.325 1H18.675L26 8.325V18.675L18.675 26H8.325L1 18.675V8.325L8.325 1Z"
      style={{ fill: backgroundColor, stroke: borderColor, strokeWidth: borderWidth }}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
