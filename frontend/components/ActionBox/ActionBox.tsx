import React, { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ActionBoxProps extends PropsWithChildren {
  identifier?: string;
}

const ActionBox: React.FC<ActionBoxProps> = ({ identifier, children }) => {
  const [actionBox, setActionBox] = useState<Element | null>(null);

  // Use effect hook runs after the component output has been rendered to the DOM
  useEffect(() => {
    const box = document.getElementById('action-box');
    setActionBox(box);

    if (!box) {
      console.error('ActionBox: No action-box element found', identifier);
    }
  }, [identifier]); // Runs every time when 'identifier' changes

  if (!actionBox) {
    return null;
  }

  return createPortal(
    <>{children}</>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    actionBox,
  );
};

export default ActionBox;
