import { createSuspenseQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbQuest } from '../../generated/api-types/data-contracts';
import { QuestsCollection } from '../collections';
import { questAdapterSlice, questSelectors } from '../../adapters/QuestAdapter';
import { store } from '../../store';

export const useGetQuestById = createSuspenseQuery<PbQuest, number, TaleboundError>({
  primaryKey: 'useGetQuestById',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (variables === 0) return {};

    const quest = questSelectors.selectById(store.getState(), variables);

    if (!quest) {
      const { data } = await QuestsCollection.questsGetQuestById(variables);
      store.dispatch(questAdapterSlice.actions.upsertQuest(data));
      return data;
    }

    return quest;
  },
});
