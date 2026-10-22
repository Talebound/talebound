import { queryClient } from '../../pages/_app';
import { useGetLocations } from './useGetLocations';
import { store } from '../../store';
import { locationAdapterSlice } from '../../adapters/LocationAdapter';
import { createMutation } from 'react-query-kit';
import { LocationsCollection } from '../collections';

interface DeleteLocationParams {
  locationId: number;
}

export const useDeleteLocation = createMutation({
  mutationFn: async (variables: DeleteLocationParams) =>
    LocationsCollection.locationsDeleteLocation(variables.locationId),
  onSuccess: (_, variables) => {
    store.dispatch(locationAdapterSlice.actions.removeLocation(variables.locationId));
    return queryClient.invalidateQueries({ queryKey: useGetLocations.getKey() });
  },
});
