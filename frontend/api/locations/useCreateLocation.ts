import { createMutation } from 'react-query-kit';
import { LocationsCollection } from '../collections';
import { PbCreateLocationRequest } from '../../generated/api-types/data-contracts';

export const useCreateLocation = createMutation({
  mutationFn: async (variables: PbCreateLocationRequest) =>
    LocationsCollection.locationsCreateLocation(variables),
  onSuccess: (data, variables) => {
    const newLocation = data.data;
    if (newLocation && variables.moduleId) {
      // const getLocationsQueryKey = useGetLocations.getKey(variables.module);
      // queryClient.setQueryData<inferData<typeof useGetLocations>>(
      //   getLocationsQueryKey,
      //   (locations) => {
      //     return [...(locations ?? []), newLocation];
      //   },
      // );
    }
  },
});
