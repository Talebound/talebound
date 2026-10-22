import { createMutation } from 'react-query-kit';
import { LocationsCollection } from '../collections';

interface DeleteLocationParams {
  locationId: number;
}

export const useDeleteLocation = createMutation({
  mutationFn: async (variables: DeleteLocationParams) =>
    LocationsCollection.locationsDeleteLocation(variables.locationId),
});
