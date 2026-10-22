import * as Tooltip from '@radix-ui/react-tooltip';
import React from 'react';
import { TooltipRoot } from './TooltipRoot';
import { TooltipArrow } from './TooltipArrow';
import { TooltipContent } from './TooltipContent';
import { TooltipProvider } from './TooltipProvider';

/** https://www.radix-ui.com/primitives/docs/components/tooltip */
const TooltipDemo = () => (
  <TooltipProvider>
    <TooltipRoot>
      <Tooltip.Trigger>
        <button>Button with tooltip</button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <TooltipContent>
          Tooltip content
          <TooltipArrow />
        </TooltipContent>
      </Tooltip.Portal>
    </TooltipRoot>
  </TooltipProvider>
);

export default TooltipDemo;
