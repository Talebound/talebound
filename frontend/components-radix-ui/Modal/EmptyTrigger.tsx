import React from 'react';

export const EmptyTrigger = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => <div ref={ref} {...props}></div>,
);

EmptyTrigger.displayName = 'EmptyTrigger';

export default EmptyTrigger;
