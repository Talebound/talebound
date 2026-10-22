import React, { useCallback } from 'react';
import { Button, ButtonVariants } from '../Button/Button';
import { Row } from '../Flex/Flex';
import { AlertDialogRoot } from '../../components-radix-ui/AlertDialog/AlertDialogRoot';
import { AlertDialogTrigger } from '../../components-radix-ui/AlertDialog/AlertDialogTrigger';
import { AlertDialogPortal } from '../../components-radix-ui/AlertDialog/AlertDialogPortal';
import { AlertDialogOverlay } from '../../components-radix-ui/AlertDialog/AlertDialogOverlay';
import {
  AlertDialogContent,
  AlertDialogContentVariants,
} from '../../components-radix-ui/AlertDialog/AlertDialogContent';
import { AlertDialogTitle } from '../../components-radix-ui/AlertDialog/AlertDialogTitle';
import { AlertDialogDescription } from '../../components-radix-ui/AlertDialog/AlertDialogDescription';
import { AlertDialogCancel } from '../../components-radix-ui/AlertDialog/AlertDialogCancel';
import { AlertDialogAction } from '../../components-radix-ui/AlertDialog/AlertDialogAction';

interface AlertDialogProps {
  dialogSize?: AlertDialogContentVariants['size'];
  triggerElement?: React.ReactNode;
  triggerButtonText?: string;
  triggerButtonColor?: ButtonVariants['color'];
  triggerButtonLoading?: boolean;
  triggerButtonDisabled?: boolean;
  triggerAsChild?: boolean;
  cancelButtonText?: string;
  dangerButtonText?: string;
  title?: string;
  description?: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  submitAction: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  dialogSize = 'sm',
  triggerElement,
  triggerButtonText,
  triggerButtonColor = 'dangerOutline',
  triggerButtonLoading = false,
  triggerButtonDisabled = false,
  triggerAsChild = true,
  cancelButtonText = 'Cancel',
  dangerButtonText = 'Confirm',
  title = 'Are you absolutely sure?',
  description = '',
  open: openExternal,
  setOpen: setOpenExternal,
  submitAction,
}) => {
  const [openInternal, setOpenInternal] = React.useState(false);

  const onOpenChange = useCallback(
    (isOpen: boolean) => {
      console.log('INTERNAL isOpen: ' + isOpen);
      if (setOpenExternal) {
        setOpenExternal(isOpen);
        console.log('EXTERNAL ' + isOpen);
      }
      setOpenInternal(isOpen);
    },
    [setOpenExternal],
  );

  const open = openExternal === undefined ? openInternal : openExternal;
  const displayTrigger = triggerElement !== undefined || triggerButtonText !== undefined;

  return (
    <AlertDialogRoot open={open} onOpenChange={onOpenChange}>
      {displayTrigger && (
        <>
          {triggerElement !== undefined ? (
            <AlertDialogTrigger asChild={triggerAsChild}>{triggerElement}</AlertDialogTrigger>
          ) : null}
          {triggerButtonText !== undefined ? (
            <AlertDialogTrigger asChild={triggerAsChild}>
              <Button
                loading={triggerButtonLoading}
                disabled={triggerButtonDisabled}
                color={triggerButtonColor}
              >
                {triggerButtonText}
              </Button>
            </AlertDialogTrigger>
          ) : null}
        </>
      )}
      <AlertDialogPortal>
        <AlertDialogOverlay onClick={() => setOpenInternal(false)} />
        <AlertDialogContent size={dialogSize}>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description.length > 0 && <AlertDialogDescription>{description}</AlertDialogDescription>}
          <Row gap="md" justifyContent="end">
            <AlertDialogCancel asChild>
              <Button color="secondaryOutline">{cancelButtonText}</Button>
            </AlertDialogCancel>
            <AlertDialogAction onClick={submitAction} asChild>
              <Button color="dangerFill">{dangerButtonText}</Button>
            </AlertDialogAction>
          </Row>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialogRoot>
  );
};

export default AlertDialog;
