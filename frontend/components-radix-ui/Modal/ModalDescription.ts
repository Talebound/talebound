import * as DialogRadix from '@radix-ui/react-dialog';
import { styled } from '../../styles/stitches.config';

export const ModalDescription = styled(DialogRadix.Description, {
  margin: '10px 0 20px',
  color: '$primary500',
  fontSize: 15,
  lineHeight: 1.5,
});
