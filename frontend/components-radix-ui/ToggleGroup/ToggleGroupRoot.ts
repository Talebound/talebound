import { styled } from '../../styles/stitches.config';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

export const ToggleGroupRoot = styled(ToggleGroup.Root, {
  display: 'inline-flex',
  backgroundColor: '$white',
  borderRadius: '4px',
  border: '1px solid $primary200',
  boxShadow: '$sm',
});
