import { css, keyframes } from '../styles/stitches.config';

export const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

export const overlayStyles = css({
  backgroundColor: 'rgba(0, 0, 0, .3)',
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 250ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

export const modalTitleStyles = css({
  margin: 0,
  // marginTop: '-10px',
  marginBottom: '20px',
  fontWeight: 600,
  color: '$primary800',
  fontSize: 20,
});

export const modalContentStyles = css({
  backgroundColor: 'white',
  // borderRadius: 6,
  boxShadow: '$lg',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minHeight: '135px',
  maxHeight: '85vh',
  overflowY: 'auto',

  padding: '1.5rem',
  zIndex: 10,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  '&:focus': { outline: 'none' },

  variants: {
    size: {
      fitContent: {
        width: 'fit-content',
      },
      full: {
        width: '90vw',
        minWidth: '450px',
        height: '85vh',
      },
      xs: {
        width: '20vw',
        minWidth: '200px',
      },
      sm: {
        width: '30vw',
        minWidth: '300px',
      },
      md: {
        width: '40vw',
        minWidth: '550px',
      },
      lg: {
        width: '50vw',
        minWidth: '550px',
      },
      xl: {
        width: '60vw',
        minWidth: '550px',
      },
    },

    noPadding: {
      true: {
        padding: 0,
      },
    },
  },

  defaultVariants: {
    size: 'full',
  },
});
