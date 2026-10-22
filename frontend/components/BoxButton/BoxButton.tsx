import { styled } from '../../styles/stitches.config';

export const BoxButton = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '$lg',
  color: '$primary700',
  border: '1px solid $primary700',
  transition: '0.3s all',
  borderRadius: '$md',

  '&:hover': {
    background: '$primary900',
    color: '$white300',
  },

  variants: {
    active: {
      true: {
        backgroundColor: '$primary200',
      },
    },
  },
});
