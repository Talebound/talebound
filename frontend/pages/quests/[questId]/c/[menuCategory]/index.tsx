import React, { Suspense } from 'react';
import ModuleCategory from '../../../../../component-sections/Module/ModuleCategory';

const MenuCategoryPageSystems: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <ModuleCategory />
    </Suspense>
  );
};

export default MenuCategoryPageSystems;
