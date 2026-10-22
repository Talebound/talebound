import { styled } from '../../styles/stitches.config';
import React, { forwardRef, useMemo } from 'react';
import Stitches from '@stitches/react';
import { Col, Flex } from '../Flex/Flex';
import { Label } from '../Typography/Label';
import { Text } from '../Typography/Text';
import { HelperType } from '../../utils/form/helperTypes';

export const StyledTextarea = styled('textarea', {
  fontFamily: '$heading',
  padding: '$4',
  borderRadius: '$md',
  cursor: 'pointer',
  fontSize: '$md',
  transition: 'all 0.2s ease-in-out',
  color: '$primary900',
  border: '1px solid transparent',

  '&:focus': {
    outline: 'none',
    boxShadow: '$md',
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
        backgroundColor: '$white200',
        '&:focus': {
          border: '1px solid $primary500',
          backgroundColor: '$white100',
        },
      },
    },
  },

  defaultVariants: {
    mode: 'white',
  },
});

export type TextareaVariants = Stitches.VariantProps<typeof StyledTextarea>;

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    TextareaVariants {
  id: string;
  label?: string;
  labelDirection?: 'row' | 'column';
  displayHelpers?: boolean;
  helperText?: string;
  helperType?: HelperType;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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

    const textarea = useMemo(
      () => (
        <StyledTextarea
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
          {textarea}
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

Textarea.displayName = 'Textarea';

export default Textarea;
