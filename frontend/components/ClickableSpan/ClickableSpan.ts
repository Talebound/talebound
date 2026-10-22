import { styled } from '../../styles/stitches.config';

export const ClickableSpan = styled('span', {
  color: '$primary200 !important',
  textDecoration: 'underline',
  transition: 'color 0.2s ease-in-out',
  cursor: 'pointer',

  '&:hover': {
    color: '$primary300 !important',
  },
});
