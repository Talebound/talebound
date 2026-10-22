import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { PbQuest } from '../generated/api-types/data-contracts';
import { ReduxState } from '../store';
import { createSelector } from 'reselect';

export const QuestAdapter = createEntityAdapter<PbQuest>({
  selectId: (quest) => quest.id!,
  sortComparer: (a, b) => a.id! - b.id!,
});

export const questAdapterSlice = createSlice({
  name: 'quests',
  initialState: QuestAdapter.getInitialState(),
  reducers: {
    addQuests: QuestAdapter.addMany,
    addQuest: QuestAdapter.addOne,
    removeQuest: QuestAdapter.removeOne,
    updateQuest: QuestAdapter.updateOne,
    upsertQuest: QuestAdapter.upsertOne,
    upsertQuests: QuestAdapter.upsertMany,
    removeQuests: QuestAdapter.removeMany,
    removeAllQuests: QuestAdapter.removeAll,
  },
});

export const questSelectors = QuestAdapter.getSelectors<ReduxState>(
  (state) => state[questAdapterSlice.name],
);

export const selectQuestsByIds = createSelector(
  [questSelectors.selectEntities, (_, ids: number[]) => ids],
  (entities, ids) => ids.map((id) => entities[id]).filter(Boolean),
);

// And then use the selectors to retrieve values
// const _allQuests = questSelectors.selectAll(store.getState());

// const quests = useSelector((state) => selectQuestsByIds(state, questIds));
