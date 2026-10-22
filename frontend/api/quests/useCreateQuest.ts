import { createMutation } from 'react-query-kit';
import { PbCreateQuestRequest } from '../../generated/api-types/data-contracts';
import { QuestsCollection } from '../collections';
import router from 'next/router';
import { store } from '../../store';
import { questAdapterSlice } from '../../adapters/QuestAdapter';
import { moduleAdapterSlice } from '../../adapters/ModuleAdapter';
import { mappingSlice } from '../../adapters/mappingSlice';

export const useCreateQuest = createMutation({
  mutationFn: async (variables: PbCreateQuestRequest) =>
    QuestsCollection.questsCreateQuest(variables),
  onSuccess: (data) => {
    if (data.data?.quest) {
      store.dispatch(questAdapterSlice.actions.upsertQuest(data.data?.quest));
    }
    if (data.data?.module) {
      store.dispatch(moduleAdapterSlice.actions.upsertModule(data.data?.module));
      store.dispatch(mappingSlice.actions.mapModules([data.data?.module]));
    }
    const questId = data.data.quest?.id;
    if (questId) {
      router.push(`/quests/${questId}/edit`).catch((error) => console.error(error));
    }
  },
});
