import { styled } from '../../styles/stitches.config';
import React, { forwardRef, PropsWithChildren, useMemo } from 'react';
import Stitches from '@stitches/react';
import Loading from '../Loading/Loading';

const LoadingOverlay = styled('div', {
  position: 'absolute',
  backgroundColor: '$transparent20',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$md',
});

const StyledButton = styled('button', {
  position: 'relative',
  display: 'inline-flex',
  whiteSpace: 'nowrap',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$sm',
  fontFamily: '$heading',
  borderRadius: '$md',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',

  '& svg': {
    fontSize: '1.25em',
  },

  '&:focus': {
    boxShadow: '$focus',
  },

  '&:disabled': {
    opacity: 0.7,
    cursor: 'not-allowed',
  },

  p: {
    color: 'inherit',
    fontSize: 'inherit',
    margin: 0,
  },

  variants: {
    color: {
      primaryFill: {
        background: '$primary700',
        border: '1px solid $primary700',
        color: '$white',

        '&:hover': {
          background: '$primary900',
          color: '$white300',
        },

        '&:focus': {
          outline: '1px solid $primary900',
        },
      },
      primaryOutline: {
        background: '$white',
        border: '1px solid $primary700',
        color: '$primary700',

        '&:hover': {
          background: '$primary900',
          color: '$white300',
        },

        '&:focus': {
          outline: '1px solid $primary900',
        },
      },
      secondaryFill: {
        background: '$secondary700',
        border: '1px solid $secondary700',
        color: '$white',

        '&:hover': {
          background: '$secondary900',
          color: '$white300',
        },

        '&:focus': {
          outline: '1px solid $secondary900',
        },
      },
      secondaryOutline: {
        background: '$white',
        border: '1px solid $secondary700',
        color: '$secondary700',

        '&:hover': {
          background: '$secondary900',
          color: '$white300',
        },

        '&:focus': {
          outline: '1px solid $secondary900',
        },
      },
      dangerFill: {
        background: '$danger',
        border: '1px solid $danger',
        color: '$white',

        '&:hover': {
          background: '$danger800',
          color: '$white500',
        },

        '&:focus': {
          outline: '1px solid $danger',
        },
      },
      dangerOutline: {
        background: '$white',
        border: '1px solid $danger',
        color: '$danger',

        '&:hover': {
          background: '$danger',
          color: '$white500',
        },

        '&:focus': {
          outline: '1px solid $danger',
        },
      },
      ghost: {
        background: 'transparent',
        border: '1px solid transparent',
        color: 'inherit',
        boxShadow: '$sm',

        '&:hover': {
          border: '1px solid currentColor',
          background: '$transparent30',
          boxShadow: '$sm',
        },

        '&:focus': {
          outline: '1px solid currentColor',
        },
      },
      semiGhost: {
        background: '$transparent50',
        border: '1px solid $transparent50',
        color: 'inherit',

        '&:hover': {
          background: '$transparent80',
        },

        '&:focus': {
          outline: '1px solid currentColor',
        },
      },
    },

    size: {
      sm: {
        height: '24px',
        paddingLeft: '$sm',
        paddingRight: '$sm',
        fontSize: '$sm',
      },
      md: {
        height: '32px',
        paddingLeft: '$md',
        paddingRight: '$md',
        fontSize: '$md',
      },
      lg: {
        height: '40px',
        paddingLeft: '$md',
        paddingRight: '$md',
        fontSize: '$lg',
      },
      xl: {
        height: '48px',
        paddingLeft: '$xl',
        paddingRight: '$xl',
        fontSize: '$xl',
      },
    },

    fullWidth: {
      true: {
        width: '100%',
      },
      false: {
        width: 'fit-content',
      },
    },

    icon: {
      true: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },

    loading: {
      true: {
        color: 'transparent',
      },
    },

    invisible: {
      true: {
        visibility: 'hidden',
      },
    },
  },

  compoundVariants: [
    {
      size: 'sm',
      icon: 'true',
      css: {
        width: '24px',
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    {
      size: 'md',
      icon: 'true',
      css: {
        width: '32px',
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    {
      size: 'lg',
      icon: 'true',
      css: {
        width: '40px',
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    {
      size: 'xl',
      icon: 'true',
      css: {
        width: '48px',
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  ],

  defaultVariants: {
    color: 'primaryFill',
    size: 'md',
    fullWidth: false,
    icon: false,
  },
});

export type ButtonVariants = Stitches.VariantProps<typeof StyledButton>;

export interface ButtonProps extends PropsWithChildren, ButtonVariants {
  loading?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  css?: Stitches.CSS;
  title?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, loading = false, disabled = false, css, ...rest }, _ref) => {
    const loadingColor = useMemo(() => {
      switch (rest.color) {
        case 'primaryFill':
        case 'secondaryFill':
        case 'dangerFill':
          return 'white';
        case 'primaryOutline':
        case 'ghost':
          return 'primary';
        case 'secondaryOutline':
          return 'secondary';
        case 'dangerOutline':
          return 'danger';
        default:
          return 'white';
      }
    }, [rest.color]);

    return (
      <StyledButton loading={loading} disabled={disabled} css={css} {...rest}>
        {children}
        {loading && (
          <LoadingOverlay>
            <Loading size="xs" color={loadingColor} />
          </LoadingOverlay>
        )}
      </StyledButton>
    );
  },
);

Button.displayName = 'Button';
