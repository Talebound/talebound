import { styled } from '../../styles/stitches.config';

export const Text = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',

  variants: {
    size: {
      xs: {
        fontSize: '$xs',
      },
      sm: {
        fontSize: '$sm',
      },
      md: {
        fontSize: '$md',
      },
      lg: {
        fontSize: '$lg',
      },
      inherit: {
        fontSize: 'inherit',
      },
    },

    weight: {
      regular: {
        fontWeight: '$regular',
      },
      medium: {
        fontWeight: '$medium',
      },
      semibold: {
        fontWeight: '$semibold',
      },
      bold: {
        fontWeight: '$bold',
      },
    },

    color: {
      primary: {
        color: '$primary800',
      },
      secondary: {
        color: '$secondary800',
      },
      tertiary: {
        color: '$tertiary800',
      },
      success: {
        color: '$success',
      },
      danger: {
        color: '$danger',
      },
      info: {
        color: '$primary300',
      },
      warning: {
        color: '$warning',
      },
      white: {
        color: '$white',
      },
      black: {
        color: '$black',
      },
      currentColor: {
        color: 'currentColor',
      },
    },

    i: {
      true: {
        fontStyle: 'italic',
      },
    },

    u: {
      true: {
        textDecoration: 'underline',
      },
    },

    b: {
      true: {
        fontWeight: '$bold',
      },
    },
  },

  defaultVariants: {
    size: 'inherit',
    weight: 'regular',
    color: 'currentColor',
    i: false,
    b: false,
  },
});
