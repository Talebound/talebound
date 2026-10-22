import { styled } from '../../styles/stitches.config';

const titleStyles = {
  fontFamily: '$heading',

  variants: {
    underline: {
      true: {
        textDecoration: 'underline',
      },
      false: {
        textDecoration: 'none',
      },
    },

    marginBottom: {
      sm: {
        marginBottom: '$sm',
      },
      md: {
        marginBottom: '$md',
      },
      lg: {
        marginBottom: '$lg',
      },
      xl: {
        marginBottom: '$xl',
      },
      none: {
        marginBottom: 0,
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
        color: '$info',
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
    },
  },

  defaultVariants: {
    underline: 'true',
    marginBottom: 'none',
    color: 'primary',
  },
};

export const TitleH1 = styled('h1', {
  ...titleStyles,
});

export const TitleH2 = styled('h2', {
  ...titleStyles,
});

export const TitleH3 = styled('h3', {
  ...titleStyles,
});

export const TitleH4 = styled('h4', {
  ...titleStyles,
});

export const TitleH5 = styled('h5', {
  ...titleStyles,
});

export const TitleH6 = styled('h6', {
  ...titleStyles,
});
