import React from 'react';
import ModuleEntityNewTag from './ModuleEntityNewTag';
import ModuleEntityTagList from './ModuleEntityTagList';

interface ModuleEntityTagAdministrationProps {
  moduleId: number;
}

const ModuleEntityTagAdministration: React.FC<ModuleEntityTagAdministrationProps> = ({
  moduleId,
}) => {
  return (
    <>
      <ModuleEntityTagList moduleId={moduleId} />
      <ModuleEntityNewTag moduleId={moduleId} />
    </>
  );
};

export default ModuleEntityTagAdministration;
