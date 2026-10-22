import React from 'react';
import { MapPinBackgroundProps } from '../MapPinBackground';

export const SvgDiamond: React.FC<Omit<MapPinBackgroundProps, 'shape'>> = ({
  width = 30,
  backgroundColor = 'white',
  borderColor = 'black',
  borderWidth = 4,
}) => (
  <svg
    overflow="visible"
    width={width}
    viewBox="0 0 32 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.09699 0.753418H24.9149C25.3147 0.753418 25.6905 0.944768 25.9257 1.26819L30.7042 7.83869C30.8796 8.07979 30.8602 8.41117 30.6581 8.63022L16.4651 24.0059C16.231 24.2595 15.8356 24.2754 15.582 24.0412C15.5739 24.0337 10.8311 18.8967 1.35374 8.63022C1.15153 8.41117 1.13219 8.07979 1.30753 7.83869L6.08608 1.26819C6.3213 0.944768 6.69707 0.753418 7.09699 0.753418Z"
      style={{ fill: backgroundColor, stroke: borderColor, strokeWidth: borderWidth }}
    />
  </svg>
);
