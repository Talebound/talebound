import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { PbViewEntity } from '../generated/api-types/data-contracts';
import { ReduxState } from '../store';
import { createSelector } from 'reselect';

export const EntityAdapter = createEntityAdapter<PbViewEntity>({
  selectId: (entity) => entity.id!,
  sortComparer: (a, b) => a.id! - b.id!,
});

export const entityAdapterSlice = createSlice({
  name: 'entities',
  initialState: EntityAdapter.getInitialState(),
  reducers: {
    addEntities: EntityAdapter.addMany,
    addEntity: EntityAdapter.addOne,
    removeEntity: EntityAdapter.removeOne,
    updateEntity: EntityAdapter.updateOne,
    upsertEntity: EntityAdapter.upsertOne,
    upsertEntities: EntityAdapter.upsertMany,
    removeEntities: EntityAdapter.removeMany,
    removeAllEntities: EntityAdapter.removeAll,
  },
});

export const entitySelectors = EntityAdapter.getSelectors<ReduxState>(
  (state) => state[entityAdapterSlice.name],
);

export const selectEntitiesByIds = createSelector(
  [entitySelectors.selectEntities, (_, ids: number[]) => ids],
  (entities, ids) => ids.map((id) => entities[id]).filter(Boolean),
);
