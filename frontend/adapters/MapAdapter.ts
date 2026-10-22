import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { PbMap } from '../generated/api-types/data-contracts';
import { ReduxState } from '../store';
import { createSelector } from 'reselect';

export const MapAdapter = createEntityAdapter<PbMap>({
  selectId: (map) => map.id!,
  sortComparer: (a, b) => a.id! - b.id!,
});

export const mapAdapterSlice = createSlice({
  name: 'maps',
  initialState: MapAdapter.getInitialState(),
  reducers: {
    addMaps: MapAdapter.addMany,
    addMap: MapAdapter.addOne,
    removeMap: MapAdapter.removeOne,
    updateMap: MapAdapter.updateOne,
    upsertMap: MapAdapter.upsertOne,
    upsertMaps: MapAdapter.upsertMany,
    removeMaps: MapAdapter.removeMany,
    removeAllMaps: MapAdapter.removeAll,
  },
});

export const mapSelectors = MapAdapter.getSelectors<ReduxState>(
  (state) => state[mapAdapterSlice.name],
);

export const selectMapsByIds = createSelector(
  [mapSelectors.selectEntities, (_, ids: number[]) => ids],
  (entities, ids) => ids.map((id) => entities[id]).filter(Boolean),
);

// And then use the selectors to retrieve values
// const _allMaps = mapSelectors.selectAll(store.getState());

// const maps = useSelector((state) => selectMapsByIds(state, mapIds));
