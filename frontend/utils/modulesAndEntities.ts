import { PbEntityType, PbModuleType } from '../generated/api-types/data-contracts';

export const modulesOfEntities: Record<PbEntityType, PbModuleType[]> = {
  [PbEntityType.ENTITY_TYPE_UNKNOWN]: [],
  [PbEntityType.ENTITY_TYPE_LOCATION]: [
    PbModuleType.MODULE_TYPE_WORLD,
    PbModuleType.MODULE_TYPE_QUEST,
  ],
  [PbEntityType.ENTITY_TYPE_MAP]: [PbModuleType.MODULE_TYPE_WORLD, PbModuleType.MODULE_TYPE_QUEST],
  [PbEntityType.ENTITY_TYPE_POST]: [
    PbModuleType.MODULE_TYPE_WORLD,
    PbModuleType.MODULE_TYPE_QUEST,
    PbModuleType.MODULE_TYPE_SYSTEM,
    PbModuleType.MODULE_TYPE_CHARACTER,
  ],
  [PbEntityType.ENTITY_TYPE_IMAGE]: [
    PbModuleType.MODULE_TYPE_WORLD,
    PbModuleType.MODULE_TYPE_QUEST,
    PbModuleType.MODULE_TYPE_SYSTEM,
    PbModuleType.MODULE_TYPE_CHARACTER,
  ],
  [PbEntityType.ENTITY_TYPE_CHARACTER]: [],
};

export const entitiesOfModules: Record<PbModuleType, PbEntityType[]> = {
  [PbModuleType.MODULE_TYPE_WORLD]: [],
  [PbModuleType.MODULE_TYPE_SYSTEM]: [],
  [PbModuleType.MODULE_TYPE_QUEST]: [],
  [PbModuleType.MODULE_TYPE_CHARACTER]: [],
  [PbModuleType.MODULE_TYPE_UNKNOWN]: [],
};

for (const entityType in modulesOfEntities) {
  const et = entityType as PbEntityType;
  modulesOfEntities[et].forEach((mt) => {
    entitiesOfModules[mt].push(et);
  });
}

export const moduleTypeTitles: Record<PbModuleType, string> = {
  [PbModuleType.MODULE_TYPE_UNKNOWN]: '- Unknown -',
  [PbModuleType.MODULE_TYPE_WORLD]: 'World',
  [PbModuleType.MODULE_TYPE_SYSTEM]: 'System',
  [PbModuleType.MODULE_TYPE_CHARACTER]: 'Character',
  [PbModuleType.MODULE_TYPE_QUEST]: 'Quest',
};

export const entityTypeTitles: Record<PbEntityType, string> = {
  [PbEntityType.ENTITY_TYPE_UNKNOWN]: '- Unknown -',
  [PbEntityType.ENTITY_TYPE_LOCATION]: 'Location',
  [PbEntityType.ENTITY_TYPE_MAP]: 'Map',
  [PbEntityType.ENTITY_TYPE_POST]: 'Post',
  [PbEntityType.ENTITY_TYPE_IMAGE]: 'Image',
  [PbEntityType.ENTITY_TYPE_CHARACTER]: 'Character',
};

export const entityTypeTitle = (et: PbEntityType, plural: boolean = false) =>
  `${entityTypeTitles[et]}${plural ? 's' : ''}`;
