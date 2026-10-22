import React, { Suspense } from 'react';
import useNumericParam from '../../../../../hooks/useNumericParam';
import ModuleCategory from '../../../../../component-sections/Module/ModuleCategory';

interface MenuItemPostProps {}

const MenuItemPostPageSystems: React.FC<MenuItemPostProps> = () => {
  const entityId = useNumericParam('entityId') ?? 0;

  return (
    <Suspense fallback={null}>
      <ModuleCategory entityId={entityId} />
    </Suspense>
  );
};

export default MenuItemPostPageSystems;
