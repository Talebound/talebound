import React from 'react';
import { useUrlModuleId } from '../../../hooks/useUrlModuleId';
import ModuleLocations from '../../../component-sections/Location/ModuleLocations';

const WorldLocations: React.FC = () => {
  const moduleId = useUrlModuleId();

  return <ModuleLocations moduleId={moduleId} />;
};

export default WorldLocations;
