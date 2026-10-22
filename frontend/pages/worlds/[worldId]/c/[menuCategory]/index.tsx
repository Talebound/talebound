import React, { Suspense } from 'react';
import ModuleCategory from '../../../../../component-sections/Module/ModuleCategory';

interface MenuCategoryProps {}

const MenuCategoryPageWorlds: React.FC<MenuCategoryProps> = () => {
  return (
    <Suspense fallback={null}>
      <ModuleCategory />
    </Suspense>
  );
};

export default MenuCategoryPageWorlds;
