import React, { Suspense } from 'react';
import ModuleCategory from '../../../../../component-sections/Module/ModuleCategory';

const MenuCategoryPageCharacters: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <ModuleCategory />
    </Suspense>
  );
};

export default MenuCategoryPageCharacters;
