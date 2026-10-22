import React, { PropsWithChildren, useMemo } from 'react';
import { CheckboxRoot, CheckboxVariants } from '../../components-radix-ui/Checkbox/CheckboxRoot';
import { CheckboxIndicator } from '../../components-radix-ui/Checkbox/CheckboxIndicator';
import { MdCheck } from 'react-icons/md';
import { Col, Flex } from '../Flex/Flex';
import { CSSProperties } from '@stitches/react';
import { CheckboxProps as RadixCheckboxProps } from '@radix-ui/react-checkbox';
import { Label } from '../Typography/Label';

interface CheckboxProps extends PropsWithChildren, CheckboxVariants, RadixCheckboxProps {
  id?: string;
  label?: string;
  labelDirection?: 'row' | 'column';
  childrenRender?: 'before' | 'after';
  childrenDirection?: CSSProperties['flexDirection'];
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  labelDirection = 'column',
  childrenRender = 'after',
  childrenDirection = 'row',
  children,
  ...checkboxProps
}) => {
  const labelId = `${id}-label`;

  const checkboxRenderer = useMemo(
    () => (
      <CheckboxRoot id={id} {...checkboxProps}>
        <CheckboxIndicator>
          <MdCheck size={20} />
        </CheckboxIndicator>
      </CheckboxRoot>
    ),
    [checkboxProps, id],
  );

  if (!children && !label) return checkboxRenderer;
  if (!children && label) {
    return (
      <Col alignItems="end" fullWidth gap="xs">
        <Flex gap="xs" fullWidth direction={labelDirection}>
          {label && <Label id={labelId}>{label}</Label>}
          {checkboxRenderer}
        </Flex>
      </Col>
    );
  }

  return (
    <Flex gap="md" alignItems="center" css={{ flexDirection: childrenDirection }}>
      {childrenRender === 'before' && <label htmlFor={id}>{children}</label>}
      {checkboxRenderer}
      {childrenRender === 'after' && <label htmlFor={id}>{children}</label>}
    </Flex>
  );
};

export default Checkbox;
