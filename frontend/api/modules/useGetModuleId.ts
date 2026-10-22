import { createQuery } from 'react-query-kit';
import { ModulesCollection } from '../collections';
import { TaleboundError } from '../../utils/types/error';
import { store } from '../../store';

type UseGetModuleIdRequest = Parameters<typeof ModulesCollection.modulesGetModuleId>[0];

export const useGetModuleId = createQuery<number, UseGetModuleIdRequest, TaleboundError>({
  primaryKey: 'useGetModuleId',
  queryFn: async ({ queryKey: [_, variables] }) => {
    if (typeof variables === 'string') return 0;
    const { worldId, systemId, questId, characterId } = variables;
    if (!worldId && !systemId && !questId && !characterId) return 0;

    const mapping = store.getState().mapping;
    let moduleId = 0;

    if (worldId && mapping.worldsModule[worldId]) {
      moduleId = mapping.worldsModule[worldId] ?? 0;
    } else if (questId && mapping.questsModule[questId]) {
      moduleId = mapping.questsModule[questId] ?? 0;
    } else if (systemId && mapping.systemsModule[systemId]) {
      moduleId = mapping.systemsModule[systemId] ?? 0;
    } else if (characterId && mapping.charactersModule[characterId]) {
      moduleId = mapping.charactersModule[characterId] ?? 0;
    }

    if (moduleId > 0) return moduleId;

    const { data } = await ModulesCollection.modulesGetModuleId(variables);
    return data.moduleId ?? 0;
  },
});
