import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { styled } from '../../styles/stitches.config';
import Stitches from '@stitches/react';

export const CheckboxRoot = styled(CheckboxRadix.Root, {
  all: 'unset',
  backgroundColor: 'white',
  border: '1px solid transparent',
  width: 24,
  height: 24,
  borderRadius: '$sm',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '$sm',
  cursor: 'pointer',
  transition: 'all 300ms ease',

  variants: {
    mode: {
      transparent: {
        background: '$transparent40',
        '&:hover': { backgroundColor: '$transparent70' },
      },
      grey: {
        backgroundColor: '$white700',
        '&:focus': { border: '1px solid $white900' },
      },
      white: {
        borderColor: '$primary300',
        backgroundColor: '$white200',
        '&:focus': {
          borderColor: '$primary500',
          backgroundColor: '$white100',
        },
      },
    },
    error: {
      true: {
        borderColor: '$danger500',
      },
    },
  },

  defaultVariants: {
    mode: 'white',
  },

  '&:hover': { backgroundColor: '$primary100' },
  '&:disabled': {
    backgroundColor: '$white900',
    cursor: 'default',
  },
  '&:focus': { borderColor: `$primary800` },
});

export type CheckboxVariants = Stitches.VariantProps<typeof CheckboxRoot>;
