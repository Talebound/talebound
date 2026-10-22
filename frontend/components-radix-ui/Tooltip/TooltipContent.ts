import { styled } from '@stitches/react';
import * as Tooltip from '@radix-ui/react-tooltip';

export const TooltipContent = styled(Tooltip.Content, {
  zIndex: 100,
  borderRadius: '4px',
  padding: '10px 15px',
  fontSize: '15px',
  lineHeight: '1',
  color: 'var(--violet-11)',
  backgroundColor: 'white',
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  userSelect: 'none',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
});
