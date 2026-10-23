import { styled } from '../../styles/stitches.config';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

export const ToggleGroupItem = styled(ToggleGroup.Item, {
  all: 'unset',
  backgroundColor: 'white',
  color: '$primary500',
  height: '35px',
  width: '35px',
  display: 'flex',
  fontSize: '15px',
  lineHeight: '1',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '1px',
  userSelect: 'none',

  '&:first-child': {
    marginLeft: '0',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
  },

  '&:last-child': {
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
  },

  '&:hover': {
    backgroundColor: '$primary200',
  },

  '&[data-state="on"]': {
    backgroundColor: '$primary500',
    color: '$white',
  },

  '&:focus': {
    position: 'relative',
    boxShadow: '$sm',
  },
});
