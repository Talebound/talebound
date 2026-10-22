import { LocationsCollection } from '../collections';
import { createMutation, inferData } from 'react-query-kit';
import { queryClient } from '../../pages/_app';
import { useGetLocations } from './useGetLocations';
import { PbViewModule } from '../../generated/api-types/data-contracts';
import { store } from '../../store';
import { locationAdapterSlice } from '../../adapters/LocationAdapter';

type UpdateLocationParams = {
  locationId: number;
  module?: PbViewModule;
  body: Parameters<typeof LocationsCollection.locationsUpdateLocation>[1];
};

export const useUpdateLocation = createMutation({
  mutationFn: async (variables: UpdateLocationParams) =>
    LocationsCollection.locationsUpdateLocation(variables.locationId, variables.body),
  onSuccess: (data, variables) => {
    const locationId = variables.locationId;
    const keyParams = variables.module;

    if (locationId && keyParams) {
      const getLocationsQueryKey = useGetLocations.getKey(keyParams);
      queryClient.setQueryData<inferData<typeof useGetLocations>>(
        getLocationsQueryKey,
        (locations) => {
          return (
            locations?.map((l) => {
              if (l.id === locationId) {
                return data.data;
              }
              return l;
            }) ?? []
          );
        },
      );
      store.dispatch(locationAdapterSlice.actions.upsertLocation(data.data));
    }
  },
});
