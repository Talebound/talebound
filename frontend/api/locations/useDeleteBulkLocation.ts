import { createMutation } from 'react-query-kit';
import { LocationsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetLocations } from './useGetLocations';
import { store } from '../../store';
import { locationAdapterSlice } from '../../adapters/LocationAdapter';

interface DeleteBulkLocationParams {
  locationIds: number[];
}

export const useDeleteBulkLocation = createMutation({
  mutationFn: async (variables: DeleteBulkLocationParams) =>
    LocationsCollection.locationsDeleteBulkLocation({ locationIds: variables.locationIds }),
  onSuccess: (_, variables) => {
    store.dispatch(locationAdapterSlice.actions.removeLocations(variables.locationIds));
    return queryClient.invalidateQueries({ queryKey: useGetLocations.getKey() });
  },
});
