import React from 'react';
import { MapPinBackgroundProps } from '../MapPinBackground';

export const SvgPentagon: React.FC<Omit<MapPinBackgroundProps, 'shape'>> = ({
  width = 30,
  backgroundColor = 'white',
  borderColor = 'black',
  borderWidth = 4,
}) => (
  <svg
    overflow="visible"
    width={width}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30.8088 13.7969C30.8658 13.6172 30.8674 13.4244 30.8132 13.2438C30.759 13.0632 30.6516 12.9031 30.505 12.7844L16.5925 1.48193C16.4253 1.34596 16.2164 1.27173 16.0009 1.27173C15.7855 1.27173 15.5765 1.34596 15.4094 1.48193L1.495 12.7863C1.34914 12.9047 1.2422 13.0641 1.18804 13.244C1.13388 13.4238 1.135 13.6158 1.19125 13.7951L6.41875 30.3457C6.47884 30.5353 6.5977 30.701 6.75815 30.8186C6.91859 30.9363 7.1123 30.9998 7.31125 31.0001H24.6888C24.8879 30.9997 25.0818 30.9359 25.2423 30.8179C25.4028 30.6999 25.5215 30.5338 25.5813 30.3438L30.8088 13.7969Z"
      style={{ fill: backgroundColor, stroke: borderColor, strokeWidth: borderWidth }}
    />
  </svg>
);
