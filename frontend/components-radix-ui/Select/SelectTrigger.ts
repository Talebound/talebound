import * as Select from '@radix-ui/react-select';
import { styled } from '../../styles/stitches.config';
import Stitches from '@stitches/react';

export const SelectTrigger = styled(Select.SelectTrigger, {
  display: 'flex',
  alignItems: 'center',
  gap: '$md',
  justifyContent: 'space-between',

  border: '1px solid transparent',
  fontFamily: '$heading',
  padding: '$4',
  borderRadius: '$md',
  cursor: 'pointer',
  fontSize: '$md',
  transition: 'all 0.2s ease-in-out',
  color: '$primary900',

  '&:focus': {
    outline: 'none',
    boxShadow: '$md',
  },

  variants: {
    fullWidth: {
      true: {
        width: '100%',
      },
    },

    mode: {
      transparent: {
        background: '$transparent40',
        '&:hover': { backgroundColor: '$transparent70' },
        '&:focus': { backgroundColor: '$transparent70' },
      },
      grey: {
        backgroundColor: '$white700',
        '&:focus': { border: '1px solid $white900' },
      },
      white: {
        borderColor: '$primary300',
        backgroundColor: '$white200',
        '&:focus': {
          border: '1px solid $primary500',
          backgroundColor: '$white100',
        },
      },
    },
  },

  defaultVariants: {
    mode: 'white',
  },
  // '&:hover': { backgroundColor: '$primary200' },
  // '&:focus': { boxShadow: `0 0 0 2px black` },
  // '&[data-placeholder]': { color: '$primary500' },
});

export type SelectTriggerVariants = Stitches.VariantProps<typeof SelectTrigger>;
