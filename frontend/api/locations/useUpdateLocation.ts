import { LocationsCollection } from '../collections';
import { createMutation } from 'react-query-kit';
import { queryClient } from '../../pages/_app';
import { useGetLocations } from './useGetLocations';
import { store } from '../../store';
import { locationAdapterSlice } from '../../adapters/LocationAdapter';

type UpdateLocationParams = {
  locationId: number;
  body: Parameters<typeof LocationsCollection.locationsUpdateLocation>[1];
};

export const useUpdateLocation = createMutation({
  mutationFn: async (variables: UpdateLocationParams) =>
    LocationsCollection.locationsUpdateLocation(variables.locationId, variables.body),
  onSuccess: (data) => {
    store.dispatch(locationAdapterSlice.actions.upsertLocation(data.data));
    return queryClient.invalidateQueries({ queryKey: useGetLocations.getKey() });
  },
});
