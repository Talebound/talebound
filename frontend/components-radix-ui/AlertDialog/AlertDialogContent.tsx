import { styled } from '../../styles/stitches.config';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { modalContentStyles } from '../styles';
import Stitches from '@stitches/react';

export const AlertDialogContent = styled(AlertDialog.Content, modalContentStyles);

export type AlertDialogContentVariants = Stitches.VariantProps<typeof AlertDialogContent>;
