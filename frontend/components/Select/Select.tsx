import React, { useMemo } from 'react';
import { CSSProperties } from '@stitches/react';
import { Col, Flex } from '../Flex/Flex';
import { Label } from '../Typography/Label';
import { Text } from '../Typography/Text';
import {
  SelectTrigger,
  SelectTriggerVariants,
} from '../../components-radix-ui/Select/SelectTrigger';
import { SelectIcon } from '../../components-radix-ui/Select/SelectIcon';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { SelectContent } from '../../components-radix-ui/Select/SelectContent';
import { SelectScrollUpButton } from '../../components-radix-ui/Select/SelectScrollUpButton';
import { SelectViewport } from '../../components-radix-ui/Select/SelectViewport';
import { SelectLabel } from '../../components-radix-ui/Select/SelectLabel';
import SelectItem from '../../components-radix-ui/Select/SelectItem';
import { SelectSeparator } from '../../components-radix-ui/Select/SelectSeparator';
import { SelectScrollDownButton } from '../../components-radix-ui/Select/SelectScrollDownButton';
import { SelectGroup } from '../../components-radix-ui/Select/SelectGroup';
import { SelectPortal } from '../../components-radix-ui/Select/SelectPortal';
import { SelectValue } from '../../components-radix-ui/Select/SelectValue';
import { SelectRoot } from '../../components-radix-ui/Select/SelectRoot';
import { SelectOptions } from '../../components-radix-ui/Select/selectLib';
import { HelperType } from '../../utils/form/helperTypes';

export interface SelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    SelectTriggerVariants {
  id: string;
  label?: string;
  labelDirection?: 'row' | 'column';
  helperText?: string;
  helperType?: HelperType;
  noHelper?: boolean;
  placeholder?: string;
  options: SelectOptions;

  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  width?: CSSProperties['width'];
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  labelDirection = 'column',
  helperText,
  helperType,
  noHelper = true,
  placeholder,
  options,

  disabled,
  defaultValue,
  value,
  onValueChange,
  width,
  ...otherProps
}) => {
  const labelId = `${id}-label`;
  const helperId = `${id}-helper`;

  const triggerCss = useMemo(
    () => ({
      width: width,
      minWidth: width,
      maxWidth: width,
    }),
    [width],
  );

  return (
    <Col alignItems="end" fullWidth gap="xs">
      <Flex gap="xs" fullWidth direction={labelDirection}>
        {label && <Label id={labelId}>{label}</Label>}
        <SelectRoot
          name={id}
          value={value}
          onValueChange={onValueChange}
          defaultValue={defaultValue}
          disabled={disabled}
        >
          <SelectTrigger css={triggerCss} aria-label={label} {...otherProps}>
            <SelectValue placeholder={placeholder} />
            <SelectIcon>
              <BsChevronDown />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectContent onClick={(e) => e.stopPropagation()}>
              <SelectScrollUpButton>
                <BsChevronUp />
              </SelectScrollUpButton>
              <SelectViewport>
                {options.type === 'options' && (
                  <SelectGroup>
                    {options.options.map((option) => (
                      <SelectItem
                        key={`${option.value}-${option.label}`}
                        value={option.value}
                        disabled={option.disabled}
                      >
                        {' '}
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                )}
                {options.type === 'group' && (
                  <>
                    {options.groups.map((group, i) => (
                      <>
                        <SelectGroup key={group.label}>
                          <SelectLabel>{group.label}</SelectLabel>
                          {group.options.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              disabled={option.disabled}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                        {i + 1 < options.groups.length && <SelectSeparator />}
                      </>
                    ))}
                  </>
                )}
              </SelectViewport>
              <SelectScrollDownButton>
                <BsChevronDown />
              </SelectScrollDownButton>
            </SelectContent>
          </SelectPortal>
        </SelectRoot>
      </Flex>
      {helperText && !noHelper && (
        <Text color={helperType} size="xs" id={helperId}>
          &nbsp;{helperText}
        </Text>
      )}
    </Col>
  );
};

export default Select;
