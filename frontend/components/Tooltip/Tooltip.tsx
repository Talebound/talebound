import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React from 'react';
import { TooltipProps as TooltipPrimitiveProps } from '@radix-ui/react-tooltip';
import { TooltipRoot } from '../../components-radix-ui/Tooltip/TooltipRoot';
import { TooltipContent } from '../../components-radix-ui/Tooltip/TooltipContent';
import { TooltipArrow } from '../../components-radix-ui/Tooltip/TooltipArrow';
import { TooltipProvider } from '../../components-radix-ui/Tooltip/TooltipProvider';

interface TooltipProps extends TooltipPrimitiveProps {
  content: React.ReactNode;
}

/** https://www.radix-ui.com/primitives/docs/components/tooltip */
const Tooltip: React.FC<TooltipProps> = ({ children, content }) => (
  <TooltipProvider delayDuration={0} skipDelayDuration={800}>
    <TooltipRoot>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipContent sideOffset={4} collisionPadding={10} asChild={false}>
          {content}
          <TooltipArrow />
        </TooltipContent>
      </TooltipPrimitive.Portal>
    </TooltipRoot>
  </TooltipProvider>
);

export default Tooltip;
