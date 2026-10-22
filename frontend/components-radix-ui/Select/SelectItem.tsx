import React, { PropsWithChildren } from 'react';
import * as Select from '@radix-ui/react-select';
import { styled } from '@stitches/react';
import { MdCheck } from 'react-icons/md';

const StyledItem = styled(Select.Item, {
  fontSize: 16,
  lineHeight: 1,
  color: '$primary700',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 35,
  padding: '0 35px 0 25px',
  position: 'relative',
  userSelect: 'none',

  '&[data-disabled]': {
    color: '$primary300',
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    outline: 'none',
    backgroundColor: '$primary500',
    color: '$primary100',
  },
});

const StyledItemIndicator = styled(Select.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

interface SelectItemProps extends React.ComponentProps<typeof Select.Item>, PropsWithChildren {}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <StyledItem {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
        <StyledItemIndicator>
          <MdCheck />
        </StyledItemIndicator>
      </StyledItem>
    );
  },
);

SelectItem.displayName = 'SelectItem';

export default SelectItem;
