import React, { PropsWithChildren } from 'react';
import { styled } from '@stitches/react';

export const StyledIconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 2px 10px rgba(0,0,0, .12)`,
  '&:focus': { boxShadow: `0 0 0 2px black` },

  variants: {
    size: {
      small: {
        height: 24,
        width: 24,
      },
      normal: {
        height: 36,
        width: 36,
      },
      large: {
        height: 48,
        width: 48,
      },
    },
    color: {
      primary: {
        backgroundColor: '$primary800',
        color: '$white',
        '&:hover': { backgroundColor: '$primary700' },
      },
      secondary: {
        backgroundColor: '$white',
        color: '$primary800',
        '&:hover': { backgroundColor: '$primary100' },
      },
    },
  },

  defaultVariants: {
    size: 'normal',
    color: 'secondary',
  },
});

interface IconButtonProps extends PropsWithChildren {
  onClick?: () => void;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, onClick, ...props }, forwardedRef) => {
    return (
      <StyledIconButton onClick={onClick} ref={forwardedRef} {...props}>
        {children}
      </StyledIconButton>
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;
