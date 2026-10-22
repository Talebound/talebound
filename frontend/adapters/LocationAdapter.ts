import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { PbLocation } from '../generated/api-types/data-contracts';
import { ReduxState } from '../store';
import { createSelector } from 'reselect';

export const LocationAdapter = createEntityAdapter<PbLocation>({
  selectId: (location) => location.id!,
  sortComparer: (a, b) => a.id! - b.id!,
});

export const locationAdapterSlice = createSlice({
  name: 'locations',
  initialState: LocationAdapter.getInitialState(),
  reducers: {
    addLocations: LocationAdapter.addMany,
    addLocation: LocationAdapter.addOne,
    removeLocation: LocationAdapter.removeOne,
    updateLocation: LocationAdapter.updateOne,
    upsertLocation: LocationAdapter.upsertOne,
    upsertLocations: LocationAdapter.upsertMany,
    removeLocations: LocationAdapter.removeMany,
    removeAllLocations: LocationAdapter.removeAll,
  },
});

export const locationSelectors = LocationAdapter.getSelectors<ReduxState>(
  (state) => state[locationAdapterSlice.name],
);

export const selectLocationsByIds = createSelector(
  [locationSelectors.selectEntities, (_, ids: number[]) => ids],
  (entities, ids) => ids.map((id) => entities[id]).filter(Boolean),
);

// And then use the selectors to retrieve values
// const _allLocations = locationSelectors.selectAll(store.getState());

// const locations = useSelector((state) => selectLocationsByIds(state, locationIds));
