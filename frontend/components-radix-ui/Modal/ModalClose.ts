import * as DialogRadix from '@radix-ui/react-dialog';
import { styled } from '../../styles/stitches.config';

export const ModalClose = styled(DialogRadix.Close, {
  position: 'absolute',
  top: 10,
  right: 10,
  cursor: 'pointer',
  borderRadius: '50%',
  color: '$primary',
  padding: '$xs',
  transition: 'background .2s ease-in-out',

  '&:hover': {
    backgroundColor: '$primary200',
  },

  variants: {
    outside: {
      true: {
        background: 'white',
        right: 16,
        top: 16,
      },
    },
  },
});
