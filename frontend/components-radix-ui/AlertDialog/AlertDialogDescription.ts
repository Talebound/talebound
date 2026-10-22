import { styled } from '../../styles/stitches.config';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

export const AlertDialogDescription = styled(AlertDialog.Description, {
  marginBottom: 20,
  color: '$primary800',
  fontSize: 15,
  lineHeight: 1.5,
});
