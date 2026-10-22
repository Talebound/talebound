import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { PbWorld } from '../generated/api-types/data-contracts';
import { ReduxState } from '../store';
import { createSelector } from 'reselect';

export const WorldAdapter = createEntityAdapter<PbWorld>({
  selectId: (world) => world.id!,
  sortComparer: (a, b) => a.id! - b.id!,
});

export const worldAdapterSlice = createSlice({
  name: 'worlds',
  initialState: WorldAdapter.getInitialState(),
  reducers: {
    addWorlds: WorldAdapter.addMany,
    addWorld: WorldAdapter.addOne,
    removeWorld: WorldAdapter.removeOne,
    updateWorld: WorldAdapter.updateOne,
    upsertWorld: WorldAdapter.upsertOne,
    upsertWorlds: WorldAdapter.upsertMany,
    removeWorlds: WorldAdapter.removeMany,
    removeAllWorlds: WorldAdapter.removeAll,
  },
});

export const worldSelectors = WorldAdapter.getSelectors<ReduxState>(
  (state) => state[worldAdapterSlice.name],
);

export const selectWorldsByIds = createSelector(
  [worldSelectors.selectEntities, (_, ids: number[]) => ids],
  (entities, ids) => ids.map((id) => entities[id]).filter(Boolean),
);

// And then use the selectors to retrieve values
// const _allWorlds = worldSelectors.selectAll(store.getState());

// const worlds = useSelector((state) => selectWorldsByIds(state, worldIds));
