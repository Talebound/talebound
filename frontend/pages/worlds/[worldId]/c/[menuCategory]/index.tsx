import React, { Suspense } from 'react';
import ModuleCategory from '../../../../../component-sections/Module/ModuleCategory';

const MenuCategoryPageWorlds: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <ModuleCategory />
    </Suspense>
  );
};

export default MenuCategoryPageWorlds;
