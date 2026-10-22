import React, { useCallback, useMemo } from 'react';
import Modal from '../../../components/Modal/Modal';
import AssignPostModalContentChoice from './AssignPostModalContentChoice';

interface AssignPostModalProps {
  trigger: React.ReactNode;
  open: boolean;
  setOpen: (value: boolean) => void;
  createNewPostCallback: () => void;
  chooseExistingPostCallback: () => void;
}

const AssignPostModal: React.FC<AssignPostModalProps> = ({
  trigger,
  open,
  setOpen,
  createNewPostCallback,
  chooseExistingPostCallback,
}) => {
  const createNewPostAndClose = useCallback(() => {
    createNewPostCallback();
    setOpen(false);
  }, [createNewPostCallback, setOpen]);

  const content = useMemo(
    () => (
      <AssignPostModalContentChoice
        createNewPostCallback={createNewPostAndClose}
        chooseExistingPostCallback={chooseExistingPostCallback}
      />
    ),
    [chooseExistingPostCallback, createNewPostAndClose],
  );

  return <Modal size="xl" trigger={trigger} content={content} open={open} onOpenChange={setOpen} />;
};

export default AssignPostModal;
