import { createMutation, inferData } from 'react-query-kit';
import { QuestsCollection } from '../collections';
import { useGetQuestById } from './useGetQuestById';
import { queryClient } from '../../pages/_app';
import { store } from '../../store';
import { questAdapterSlice } from '../../adapters/QuestAdapter';

type UpdateQuestParams = {
  questId: number;
  body: Parameters<typeof QuestsCollection.questsUpdateQuest>[1];
};

export const useUpdateQuest = createMutation({
  mutationFn: async (variables: UpdateQuestParams) =>
    QuestsCollection.questsUpdateQuest(variables.questId, variables.body),
  onSuccess: (data) => {
    const questId = data.data.id;
    if (questId) {
      const questQueryKey = useGetQuestById.getKey(questId);
      queryClient.setQueryData<inferData<typeof useGetQuestById>>(questQueryKey, () => {
        return data.data;
      });
      store.dispatch(questAdapterSlice.actions.upsertQuest(data.data));
    }
  },
});
