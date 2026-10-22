import React from 'react';
import { isModuleCollaborator, useMyModuleRole } from '../../hooks/useModuleAdmins';
import ModuleLayout from '../../components/Layout/ModuleLayout';
import LocationsScreen from '../../screens/menus/Locations/LocationsScreen';

interface ModuleLocationsProps {
  moduleId: number;
}

const ModuleLocations: React.FC<ModuleLocationsProps> = ({ moduleId }) => {
  const { role } = useMyModuleRole(moduleId);
  const canEdit = isModuleCollaborator(role);

  return (
    <ModuleLayout>
      <LocationsScreen canEdit={canEdit} />
    </ModuleLayout>
  );
};

export default ModuleLocations;
