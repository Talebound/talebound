import React, { Suspense } from 'react';
import { useUrlModuleId } from '../../hooks/useUrlModuleId';
import ModuleLayout from '../../components/Layout/ModuleLayout';
import MenuCategoryPage from '../Menu/MenuCategoryPage';
import { isModuleCollaborator, useMyModuleRole } from '../../hooks/useModuleAdmins';
import { useModule } from '../../hooks/useModule';
import { useEntity } from '../../hooks/useEntity';

interface ModuleCategoryProps {
  entityId?: number;
}

const ModuleCategory: React.FC<ModuleCategoryProps> = ({ entityId }) => {
  const moduleId = useUrlModuleId();
  const { module, linkPrefix, moduleTypeId } = useModule(moduleId);
  const { entity } = useEntity(entityId ?? 0);
  const menuId = module?.menuId ?? 0;
  const { role } = useMyModuleRole(moduleId);
  const canEdit = isModuleCollaborator(role);

  const isEntityOfModule = entity?.moduleId === moduleId;

  return (
    <>
      <ModuleLayout>
        <Suspense fallback={null}>
          <MenuCategoryPage
            menuId={menuId}
            entityId={isEntityOfModule ? entityId : undefined}
            linkPrefix={`/${linkPrefix}/${moduleTypeId}`}
            canEdit={canEdit}
          />
        </Suspense>
      </ModuleLayout>
    </>
  );
};

export default ModuleCategory;
