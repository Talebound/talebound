import { styled } from '../../styles/stitches.config';
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu';

export const DropdownMenuSeparator = styled(DropdownMenuRadix.Separator, {
  height: 1,
  backgroundColor: '$primary200',
  margin: 5,
});
