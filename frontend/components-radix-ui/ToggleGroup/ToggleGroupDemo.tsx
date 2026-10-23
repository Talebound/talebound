import React from 'react';
import { TbAlignCenter, TbAlignLeft, TbAlignRight } from 'react-icons/tb';
import { ToggleGroupRoot } from './ToggleGroupRoot';
import { ToggleGroupItem } from './ToggleGroupItem';

/** https://www.radix-ui.com/primitives/docs/components/toggle-group */
const ToggleGroupDemo = () => (
  <ToggleGroupRoot type="single" defaultValue="center" aria-label="Text alignment">
    <ToggleGroupItem value="left" aria-label="Left aligned">
      <TbAlignLeft />
    </ToggleGroupItem>
    <ToggleGroupItem value="center" aria-label="Center aligned">
      <TbAlignCenter />
    </ToggleGroupItem>
    <ToggleGroupItem value="right" aria-label="Right aligned">
      <TbAlignRight />
    </ToggleGroupItem>
  </ToggleGroupRoot>
);

export default ToggleGroupDemo;
