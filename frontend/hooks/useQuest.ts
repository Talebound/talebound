import { PbViewModule, PbQuest } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { useGetQuestById } from '../api/quests/useGetQuestById';
import { TaleboundError } from '../utils/types/error';
import { useModule } from './useModule';
import { useGetModuleId } from '../api/modules/useGetModuleId';
import { useSelector } from 'react-redux';
import { questSelectors } from '../adapters/QuestAdapter';

interface UseQuestResponse {
  moduleId: number;
  module: PbViewModule | undefined;
  quest: PbQuest | undefined;
  isFetching: boolean;
  error: TaleboundError | null;
}

export const useQuest = (questId: number): UseQuestResponse => {
  const { isFetching: isFetchingQuest, error: errorQuest } = useGetQuestById({
    variables: questId,
  });
  const quest = useSelector((state) => questSelectors.selectById(state, questId));

  const { data: moduleId = 0 } = useGetModuleId({ variables: { questId } });

  const { module, isFetching: isFetchingModule, error: errorModule } = useModule(moduleId);

  return useMemo(
    () => ({
      moduleId,
      module,
      quest,
      isFetching: isFetchingQuest ?? isFetchingModule,
      error: errorQuest ?? errorModule,
    }),
    [errorModule, errorQuest, isFetchingModule, isFetchingQuest, module, moduleId, quest],
  );
};
