import { styled } from '../../styles/stitches.config';
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu';
import { stylesDropdownMenuItem } from './stylesDropdownMenuItem';

export const DropdownMenuCheckboxItem = styled(
  DropdownMenuRadix.CheckboxItem,
  stylesDropdownMenuItem,
);
