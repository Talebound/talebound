import { styled } from '../../styles/stitches.config';

export const Label = styled('label', {
  color: '$primary800',
  fontFamily: '$heading',
  fontSize: '$md',
  textTransform: 'uppercase',
  width: 'min(75%, 20rem)',
  marginBottom: '0',

  variants: {
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
});
