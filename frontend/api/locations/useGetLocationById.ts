import { createSuspenseQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbLocation } from '../../generated/api-types/data-contracts';
import { LocationsCollection } from '../collections';
import { locationAdapterSlice, locationSelectors } from '../../adapters/LocationAdapter';
import { store } from '../../store';

export const useGetLocationById = createSuspenseQuery<PbLocation, number, TaleboundError>({
  primaryKey: 'useGetLocationById',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (!variables) return {};
    const location = locationSelectors.selectById(store.getState(), variables);
    if (!location) {
      const { data } = await LocationsCollection.locationsGetLocationById(variables);
      store.dispatch(locationAdapterSlice.actions.upsertLocation(data));
      return data;
    }
    return location;
  },
});
