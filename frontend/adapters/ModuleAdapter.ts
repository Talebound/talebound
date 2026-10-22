import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { PbViewModule } from '../generated/api-types/data-contracts';
import { ReduxState } from '../store';
import { createSelector } from 'reselect';

export const ModuleAdapter = createEntityAdapter<PbViewModule>({
  selectId: (module) => module.id!,
  sortComparer: (a, b) => a.id! - b.id!,
});

export const moduleAdapterSlice = createSlice({
  name: 'modules',
  initialState: ModuleAdapter.getInitialState(),
  reducers: {
    addModules: ModuleAdapter.addMany,
    addModule: ModuleAdapter.addOne,
    removeModule: ModuleAdapter.removeOne,
    updateModule: ModuleAdapter.updateOne,
    upsertModule: ModuleAdapter.upsertOne,
    upsertModules: ModuleAdapter.upsertMany,
    removeModules: ModuleAdapter.removeMany,
    removeAllModules: ModuleAdapter.removeAll,
  },
});

export const moduleSelectors = ModuleAdapter.getSelectors<ReduxState>(
  (state) => state[moduleAdapterSlice.name],
);

export const selectModulesByIds = createSelector(
  [moduleSelectors.selectEntities, (_, ids: number[]) => ids],
  (entities, ids) => ids.map((id) => entities[id]).filter(Boolean),
);
