import React from 'react';
import { ModalRoot } from '../../components-radix-ui/Modal/ModalRoot';
import { ModalTrigger } from '../../components-radix-ui/Modal/ModalTrigger';
import { ModalPortal } from '../../components-radix-ui/Modal/ModalPortal';
import { ModalOverlay } from '../../components-radix-ui/Modal/ModalOverlay';
import { ModalContent, ModalContentVariants } from '../../components-radix-ui/Modal/ModalContent';
import { ModalTitle } from '../../components-radix-ui/Modal/ModalTitle';
import { ModalDescription } from '../../components-radix-ui/Modal/ModalDescription';
import { ModalClose } from '../../components-radix-ui/Modal/ModalClose';
import { MdClose } from 'react-icons/md';
import { DialogProps } from '@radix-ui/react-dialog';

interface ModalProps extends DialogProps, ModalContentVariants {
  trigger: React.ReactNode;
  content: React.ReactNode;
  title?: string;
  description?: string;
}

const Modal: React.FC<ModalProps> = ({
  trigger,
  content,
  title,
  description,
  size,
  noPadding,
  ...dialogProps
}) => {
  const closeButtonOutside = noPadding;

  return (
    <ModalRoot {...dialogProps}>
      <ModalTrigger asChild>{trigger}</ModalTrigger>
      <ModalPortal>
        <ModalOverlay />
        <ModalContent noPadding={noPadding} size={size} onClick={(e) => e.stopPropagation()}>
          {title && <ModalTitle>{title}</ModalTitle>}
          {description && <ModalDescription>{description}</ModalDescription>}
          {content}
          <ModalClose asChild outside={closeButtonOutside}>
            <MdClose size={32} />
          </ModalClose>
        </ModalContent>
      </ModalPortal>
    </ModalRoot>
  );
};

export default Modal;
