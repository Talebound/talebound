import React from 'react';
import { useModule } from '../../../hooks/useModule';
import { PbModuleType } from '../../../generated/api-types/data-contracts';
import ActionBoxCollaborators from './ActionBoxCollaborators';
import ActionBoxCharacter from './ActionBoxCharacter';
import { ActionBoxButtonType } from './actionBoxLib';
import ActionBoxQuest from './ActionBoxQuest';

interface ActionBoxModuleProps {
  moduleId: number;
  activeButton?: ActionBoxButtonType;
}

const ActionBoxModule: React.FC<ActionBoxModuleProps> = ({ moduleId, activeButton }) => {
  const { module } = useModule(moduleId);

  switch (module?.moduleType) {
    case PbModuleType.MODULE_TYPE_WORLD:
      return <ActionBoxCollaborators moduleId={moduleId} activeButton={activeButton} />;
    case PbModuleType.MODULE_TYPE_SYSTEM:
      return <ActionBoxCollaborators moduleId={moduleId} activeButton={activeButton} />;
    case PbModuleType.MODULE_TYPE_CHARACTER:
      return <ActionBoxCharacter moduleId={moduleId} activeButton={activeButton} />;
    case PbModuleType.MODULE_TYPE_QUEST:
      return <ActionBoxQuest moduleId={moduleId} activeButton={activeButton} />;
  }
};

export default ActionBoxModule;
