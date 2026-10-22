import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { PbSystem } from '../generated/api-types/data-contracts';
import { ReduxState } from '../store';
import { createSelector } from 'reselect';

export const SystemAdapter = createEntityAdapter<PbSystem>({
  selectId: (system) => system.id!,
  sortComparer: (a, b) => a.id! - b.id!,
});

export const systemAdapterSlice = createSlice({
  name: 'systems',
  initialState: SystemAdapter.getInitialState(),
  reducers: {
    addSystems: SystemAdapter.addMany,
    addSystem: SystemAdapter.addOne,
    removeSystem: SystemAdapter.removeOne,
    updateSystem: SystemAdapter.updateOne,
    upsertSystem: SystemAdapter.upsertOne,
    upsertSystems: SystemAdapter.upsertMany,
    removeSystems: SystemAdapter.removeMany,
    removeAllSystems: SystemAdapter.removeAll,
  },
});

export const systemSelectors = SystemAdapter.getSelectors<ReduxState>(
  (state) => state[systemAdapterSlice.name],
);

export const selectSystemsByIds = createSelector(
  [systemSelectors.selectEntities, (_, ids: number[]) => ids],
  (entities, ids) => ids.map((id) => entities[id]).filter(Boolean),
);

// And then use the selectors to retrieve values
// const _allSystems = systemSelectors.selectAll(store.getState());

// const systems = useSelector((state) => selectSystemsByIds(state, systemIds));
