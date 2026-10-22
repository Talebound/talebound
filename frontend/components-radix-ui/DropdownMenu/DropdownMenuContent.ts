import { styled } from '../../styles/stitches.config';
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu';
import { stylesDropdownContent } from './stylesDropdownContent';

export const DropdownMenuContent = styled(DropdownMenuRadix.Content, stylesDropdownContent);
