import { styled } from '../../styles/stitches.config';
import React, { forwardRef, useMemo } from 'react';
import Stitches from '@stitches/react';
import { Col, Flex } from '../Flex/Flex';
import { Label } from '../Typography/Label';
import { Text } from '../Typography/Text';
import { HelperType } from '../../utils/form/helperTypes';

export const StyledInput = styled('input', {
  fontFamily: '$heading',
  padding: '$4',
  borderRadius: '$md',
  cursor: 'pointer',
  fontSize: '$md',
  transition: 'all 0.2s ease-in-out',
  color: '$primary900',
  border: '1px solid transparent',
  backgroundColor: '$white200',

  '&:focus': {
    outline: 'none',
    boxShadow: '$md',
    backgroundColor: '$white100',
  },

  '&:disabled': {
    opacity: 0.7,
    backgroundColor: '$white300',
    cursor: 'not-allowed',
  },

  variants: {
    fullWidth: {
      true: {
        width: '100%',
      },
    },

    mode: {
      transparent: {
        background: '$transparent40',
        '&:hover': { backgroundColor: '$transparent70' },
        '&:focus': { backgroundColor: '$transparent70' },
      },
      grey: {
        backgroundColor: '$white700',
        '&:focus': { border: '1px solid $white900' },
      },
      white: {
        borderColor: '$primary300',
        '&:focus': {
          border: '1px solid $primary500',
        },
      },
      info: {
        borderColor: '$info400',
        color: '$info700',
        '&:focus': {
          border: '1px solid $info500',
        },
      },
      error: {
        borderColor: '$danger400',
        color: '$danger700',
        '&:focus': {
          border: '1px solid $danger500',
        },
      },
    },
  },

  defaultVariants: {
    mode: 'white',
  },
});

export type InputVariants = Stitches.VariantProps<typeof StyledInput>;

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, InputVariants {
  id: string;
  label?: string;
  labelDirection?: 'row' | 'column';
  displayHelpers?: boolean;
  helperText?: string;
  helperType?: HelperType;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      labelDirection = 'column',
      displayHelpers = true,
      helperText,
      helperType,
      ...otherProps
    },
    ref,
  ) => {
    const labelId = `${id}-label`;
    const helperId = `${id}-helper`;

    const input = useMemo(
      () => (
        <StyledInput
          aria-labelledby={`${labelId} ${helperId}`}
          id={id}
          name={id}
          ref={ref}
          {...otherProps}
        />
      ),
      [helperId, id, labelId, otherProps, ref],
    );

    return (
      <Col alignItems="end" fullWidth gap="xs">
        <Flex gap="xs" fullWidth direction={labelDirection}>
          {label && <Label id={labelId}>{label}</Label>}
          {input}
        </Flex>
        {displayHelpers && (
          <Text color={helperType} size="xs" id={helperId}>
            &nbsp;{helperText}
          </Text>
        )}
      </Col>
    );
  },
);

Input.displayName = 'Input';

export default Input;
