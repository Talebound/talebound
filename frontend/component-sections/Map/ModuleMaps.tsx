import React from 'react';
import { isModuleCollaborator, useMyModuleRole } from '../../hooks/useModuleAdmins';
import ModuleLayout from '../../components/Layout/ModuleLayout';
import MapsScreen from '../../screens/menus/Maps/MapsScreen';

interface ModuleMapsProps {
  moduleId: number;
}

const ModuleMaps: React.FC<ModuleMapsProps> = ({ moduleId }) => {
  const { role } = useMyModuleRole(moduleId);
  const canEdit = isModuleCollaborator(role);

  return (
    <ModuleLayout>
      <MapsScreen canEdit={canEdit} />
    </ModuleLayout>
  );
};

export default ModuleMaps;
