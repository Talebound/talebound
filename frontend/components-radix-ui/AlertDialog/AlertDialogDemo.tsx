import React from 'react';
import { Button } from '../../components/Button/Button';
import { AlertDialogOverlay } from './AlertDialogOverlay';
import { Row } from '../../components/Flex/Flex';
import { AlertDialogTitle } from './AlertDialogTitle';
import { AlertDialogDescription } from './AlertDialogDescription';
import { AlertDialogContent } from './AlertDialogContent';
import { AlertDialogAction } from './AlertDialogAction';
import { AlertDialogCancel } from './AlertDialogCancel';
import { AlertDialogPortal } from './AlertDialogPortal';
import { AlertDialogRoot } from './AlertDialogRoot';
import { AlertDialogTrigger } from './AlertDialogTrigger';

const AlertDialogDemo: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <AlertDialogRoot open={open}>
      <AlertDialogTrigger asChild onClick={() => setOpen(true)}>
        <Button color="dangerOutline">Delete account</Button>
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay onClick={() => setOpen(false)} />
        <AlertDialogContent size="sm">
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
          <Row gap="md" justifyContent="end">
            <AlertDialogCancel asChild>
              <Button color="secondaryOutline">Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button color="dangerFill">Yes, delete account</Button>
            </AlertDialogAction>
          </Row>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialogRoot>
  );
};

export default AlertDialogDemo;
