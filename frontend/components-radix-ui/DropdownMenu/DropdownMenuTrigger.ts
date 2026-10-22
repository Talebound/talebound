import { styled } from '../../styles/stitches.config';
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu';

export const DropdownMenuTrigger = styled(DropdownMenuRadix.Trigger, {
  border: '3px solid transparent',
  background: 'transparent',

  '&:hover': {
    border: '3px solid $primary200',
  },

  '&:focus': {
    outline: 'none',
    boxShadow: '$focus',
  },

  variants: {
    circle: {
      true: {
        borderRadius: '100%',
      },
    },
    noBorder: {
      true: {
        border: 0,
        '&:hover': {
          border: 0,
        },
        '&:focus': {
          border: 0,
        },
      },
    },
  },
});
