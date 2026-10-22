import { queryClient } from '../../pages/_app';
import { useGetLocations } from './useGetLocations';
import { store } from '../../store';
import { locationAdapterSlice } from '../../adapters/LocationAdapter';
import { createMutation } from 'react-query-kit';
import { LocationsCollection } from '../collections';
import { PbCreateLocationRequest } from '../../generated/api-types/data-contracts';

export const useCreateLocation = createMutation({
  mutationFn: async (variables: PbCreateLocationRequest) =>
    LocationsCollection.locationsCreateLocation(variables),
  onSuccess: (data) => {
    store.dispatch(locationAdapterSlice.actions.upsertLocation(data.data));
    return queryClient.invalidateQueries({ queryKey: useGetLocations.getKey() });
  },
});
