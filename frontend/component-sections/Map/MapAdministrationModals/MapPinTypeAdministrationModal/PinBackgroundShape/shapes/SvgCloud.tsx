import React from 'react';
import { MapPinBackgroundProps } from '../MapPinBackground';

export const SvgCloud: React.FC<Omit<MapPinBackgroundProps, 'shape'>> = ({
  width = 30,
  backgroundColor = 'white',
  borderColor = 'black',
  borderWidth = 4,
}) => (
  <svg
    overflow="visible"
    width={width}
    viewBox="0 0 30 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.5 9.4375C22.9791 4.19102 19.3398 1 15.0625 1C11.0195 1 8.41563 3.82422 7.5625 6.625C4.04688 6.97656 1 9.1791 1 13.1875C1 17.0547 4.16406 19.75 8.03125 19.75H23.2656C26.4883 19.75 29.125 18.1422 29.125 14.5938C29.125 11.0887 26.0195 9.56875 23.5 9.4375Z"
      style={{ fill: backgroundColor, stroke: borderColor, strokeWidth: borderWidth }}
      strokeLinejoin="round"
    />
  </svg>
);
