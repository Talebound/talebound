import { styled } from '../../styles/stitches.config';
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu';

export const DropdownMenuLabel = styled(DropdownMenuRadix.Label, {
  paddingLeft: 25,
  fontSize: 16,
  lineHeight: '25px',
  color: '$primary800',
});
