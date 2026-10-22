import React from 'react';
import { MapPinBackgroundProps } from '../MapPinBackground';

export const SvgStar: React.FC<Omit<MapPinBackgroundProps, 'shape'>> = ({
  width = 30,
  backgroundColor = 'white',
  borderColor = 'black',
  borderWidth = 4,
}) => (
  <svg
    overflow="visible"
    width={width}
    viewBox="0 0 30 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.4375 9.93295L19.8282 8.82358L16.4271 1.92774C15.8177 0.698577 14.0521 0.682952 13.4375 1.92774L10.0365 8.82358L2.42711 9.93295C1.06252 10.1309 0.51565 11.8132 1.50523 12.7767L7.01044 18.1413L5.70836 25.7194C5.47398 27.0892 6.91669 28.1152 8.12502 27.4746L14.9323 23.8965L21.7396 27.4746C22.9479 28.11 24.3907 27.0892 24.1563 25.7194L22.8542 18.1413L28.3594 12.7767C29.349 11.8132 28.8021 10.1309 27.4375 9.93295Z"
      style={{ fill: backgroundColor, stroke: borderColor, strokeWidth: borderWidth }}
    />
  </svg>
);
