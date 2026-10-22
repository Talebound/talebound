import { keyframes } from '../../styles/stitches.config';

const openScale = keyframes({
  '0%': { opacity: 0, transform: 'translateZ(0px) scale(0.35)' },
  '60%': { opacity: 0.75, backfaceVisibility: 'hidden', transform: 'translateZ(0px) scale(1.05)' },
  '100%': { opacity: 1, transform: 'translateZ(0px) scale(1)' },
});

const closeScale = keyframes({
  '0%': { opacity: 1, transform: 'translateZ(0px) scale(1)' },
  '40%': { opacity: 0.75, transform: 'translateZ(0px) scale(1.05)' },
  '100%': { opacity: 0, transform: 'translateZ(0px) scale(0.35)' },
});

export const stylesDropdownContent = {
  minWidth: 140,
  backgroundColor: 'white',
  borderRadius: 6,
  padding: 5,
  zIndex: 10,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  animationDuration: '0.3s',
  animationFillMode: 'both',
  animationTimingFunction: 'ease-out',
  willChange: 'transform, opacity, backface-visibility',
  '&[data-side="top"]': {
    '&[data-align="start"]': { transformOrigin: 'left bottom' },
    '&[data-align="center"]': { transformOrigin: 'bottom' },
    '&[data-align="end"]': { transformOrigin: 'right bottom' },
  },
  '&[data-side="right"]': {
    '&[data-align="start"]': { transformOrigin: 'left top' },
    '&[data-align="center"]': { transformOrigin: 'left' },
    '&[data-align="end"]': { transformOrigin: 'left bottom' },
  },
  '&[data-side="bottom"]': {
    '&[data-align="start"]': { transformOrigin: 'left top' },
    '&[data-align="center"]': { transformOrigin: 'top' },
    '&[data-align="end"]': { transformOrigin: 'right top' },
  },
  '&[data-side="left"]': {
    '&[data-align="start"]': { transformOrigin: 'right top' },
    '&[data-align="center"]': { transformOrigin: 'right' },
    '&[data-align="end"]': { transformOrigin: 'right bottom' },
  },

  '&[data-state="open"]': {
    animationName: openScale,
  },
  '&[data-state="closed"]': {
    animationName: closeScale,
  },
};
