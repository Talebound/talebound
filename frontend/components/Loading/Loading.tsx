import React from 'react';
import { keyframes, styled } from '../../styles/stitches.config';

const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

type LoadingSize = 'xs' | 'sm' | 'md' | 'lg';
type LoadingColor =
  | 'currentColor'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'white'
  | 'black'
  | 'success'
  | 'danger';

const LoadingWrapper = styled('span', {
  display: 'inline-flex',
  borderRadius: '50%',
  position: 'relative',
  width: '1.75rem',
  height: '1.75rem',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',

  variants: {
    size: {
      xs: {
        width: 16,
        height: 16,
      },
      sm: {
        width: 24,
        height: 24,
      },
      md: {
        width: 36,
        height: 36,
      },
      lg: {
        width: 48,
        height: 48,
      },
    },
    color: {
      currentColor: {
        color: 'currentColor',
      },
      primary: {
        color: '$primary',
      },
      secondary: {
        color: '$secondary',
      },
      tertiary: {
        color: '$tertiary',
      },
      white: {
        color: '$white',
      },
      black: {
        color: '$black',
      },
      success: {
        color: '$success',
      },
      danger: {
        color: '$danger',
      },
    },
  },

  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});

const Part1 = styled('i', {
  position: 'absolute',
  top: '0',
  width: '100%',
  height: '100%',

  // borderTop: 'calc(0.125rem * 1.5) solid currentColor',
  borderRight: 'calc(0.125rem * 1.5) solid currentColor',
  borderRadius: 'inherit',

  willChange: 'transform',
  animationDuration: '0.8s',
  animationTimingFunction: 'linear',
  animationDelay: '0s',
  animationDirection: 'normal',
  animationIterationCount: 'infinite',
  animationFillMode: 'none',
  animationPlayState: 'running',
  animationName: rotate(),
});

const Part2 = styled(Part1, {
  opacity: 0.5,
  borderRight: '0px solid currentColor',
  borderLeft: 'calc(0.125rem * 1.5) solid currentColor',

  animationTimingFunction: 'ease',
});

interface LoadingProps {
  size?: LoadingSize;
  color?: LoadingColor;
}

const Loading: React.FC<LoadingProps> = ({ size, color }) => {
  return (
    <LoadingWrapper size={size} color={color}>
      <Part1 />
      <Part2 />
    </LoadingWrapper>
  );
};

export default Loading;
