import React from 'react';
import ModuleMaps from '../../../component-sections/Map/ModuleMaps';
import { useUrlModuleId } from '../../../hooks/useUrlModuleId';

const CharacterMaps: React.FC = () => {
  const moduleId = useUrlModuleId();

  return <ModuleMaps moduleId={moduleId} />;
};

export default CharacterMaps;
