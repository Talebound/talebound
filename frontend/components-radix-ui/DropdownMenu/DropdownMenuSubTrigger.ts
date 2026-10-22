import { styled } from '../../styles/stitches.config';
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu';
import { stylesDropdownMenuItem } from './stylesDropdownMenuItem';

export const DropdownMenuSubTrigger = styled(DropdownMenuRadix.SubTrigger, {
  '&[data-state="open"]': {
    backgroundColor: '$primary300',
    color: '$primary800',
  },
  ...stylesDropdownMenuItem,
});
