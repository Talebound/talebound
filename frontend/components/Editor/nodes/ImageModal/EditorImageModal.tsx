import React, { useMemo } from 'react';
import Modal from '../../../Modal/Modal';
import EditorImageModalContent, { EditorImageModalContentProps } from './EditorImageModalContent';

interface ImageModalProps extends EditorImageModalContentProps {
  trigger: React.ReactNode;
  open?: boolean;
}

const EditorImageModal: React.FC<ImageModalProps> = ({
  trigger,
  open,
  setOpen,
  ...contentProps
}) => {
  const content = useMemo(
    () => <EditorImageModalContent setOpen={setOpen} {...contentProps} />,
    [contentProps, setOpen],
  );

  return <Modal open={open} onOpenChange={setOpen} size="xl" trigger={trigger} content={content} />;
};

export default EditorImageModal;
