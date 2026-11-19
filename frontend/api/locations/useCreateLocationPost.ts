import { createMutation } from 'react-query-kit';
import { LocationsCollection } from '../collections';
import { store } from '../../store';
import { locationAdapterSlice } from '../../adapters/LocationAdapter';
import { queryClient } from '../../pages/_app';
import { useGetLocationById } from './useGetLocationById';
import { useGetLocations } from './useGetLocations';
import { useGetPosts } from '../posts/useGetPosts';

export interface CreateLocationPostRequest {
  locationId: number;
}

export const useCreateLocationPost = createMutation({
  mutationFn: async (variables: CreateLocationPostRequest) =>
    LocationsCollection.locationsCreateLocationPost(variables.locationId),
  onSuccess: async ({ data }, { locationId }) => {
    store.dispatch(locationAdapterSlice.actions.upsertLocation(data));
    queryClient.setQueryData(useGetLocationById.getKey(locationId), data);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: useGetLocations.getKey() }),
      queryClient.invalidateQueries({ queryKey: useGetPosts.getKey() }),
    ]);
  },
});
