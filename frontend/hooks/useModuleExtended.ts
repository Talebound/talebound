import {
  PbCharacter,
  PbModuleType,
  PbQuest,
  PbSystem,
  PbViewModule,
  PbWorld,
} from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { useGetModuleById } from '../api/modules/useGetModuleById';
import { useGetWorldById } from '../api/worlds/useGetWorldById';
import { useSelector } from 'react-redux';
import { moduleSelectors } from '../adapters/ModuleAdapter';
import { useGetSystemById } from '../api/systems/useGetSystemById';
import { useGetCharacterById } from '../api/characters/useGetCharacterById';
import { useGetQuestById } from '../api/quests/useGetQuestById';

const urlParts: Record<PbModuleType, string> = {
  [PbModuleType.MODULE_TYPE_WORLD]: 'worlds',
  [PbModuleType.MODULE_TYPE_SYSTEM]: 'systems',
  [PbModuleType.MODULE_TYPE_QUEST]: 'quests',
  [PbModuleType.MODULE_TYPE_CHARACTER]: 'characters',
  [PbModuleType.MODULE_TYPE_UNKNOWN]: '-',
};

interface UseModuleExtendedResponse {
  module: PbViewModule | undefined;
  world: PbWorld | undefined;
  system: PbSystem | undefined;
  character: PbCharacter | undefined;
  quest: PbQuest | undefined;
  name: string;
  moduleTypeId: number;
  urlPart: string;
}

export const useModuleExtended = (moduleId: number): UseModuleExtendedResponse => {
  useGetModuleById({ variables: moduleId });
  const module = useSelector((state) => moduleSelectors.selectById(state, moduleId));
  const { data: world } = useGetWorldById({ variables: module?.worldId ?? 0 });
  const { data: system } = useGetSystemById({ variables: module?.systemId ?? 0 });
  const { data: character } = useGetCharacterById({ variables: module?.characterId ?? 0 });
  const { data: quest } = useGetQuestById({ variables: module?.questId ?? 0 });

  return useMemo(
    () => ({
      module,
      world,
      system,
      character,
      quest,
      name: world?.name ?? system?.name ?? character?.name ?? quest?.name ?? '',
      moduleTypeId: world?.id ?? system?.id ?? character?.id ?? quest?.id ?? 0,
      urlPart: urlParts[module?.moduleType ?? PbModuleType.MODULE_TYPE_UNKNOWN],
    }),
    [character, module, quest, system, world],
  );
};
