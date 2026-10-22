import React, { useMemo } from 'react';
import Modal from '../../../Modal/Modal';
import ColorPickerContent from '../../../ColorPicker/ColorPickerContent';
import { Row } from '../../../Flex/Flex';

interface ColorPickerModalProps {
  title?: string;
  trigger: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  color: string;
  onChange?: (color: string) => void;
}

const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  title,
  trigger,
  open,
  color: backgroundColor,
  onChange,
  setOpen,
}) => {
  const content = useMemo(
    () => (
      <Row fullWidth justifyContent="center">
        <ColorPickerContent color={backgroundColor} onChange={onChange} />
      </Row>
    ),
    [backgroundColor, onChange],
  );

  return (
    <Modal
      title={title}
      open={open}
      onOpenChange={setOpen}
      size="fitContent"
      trigger={trigger}
      content={content}
    />
  );
};

export default ColorPickerModal;
