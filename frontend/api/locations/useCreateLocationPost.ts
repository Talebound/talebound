import { createMutation } from 'react-query-kit';
import { LocationsCollection } from '../collections';

export interface CreateLocationPostRequest {
  locationId: number;
}

export const useCreateLocationPost = createMutation({
  mutationFn: async (variables: CreateLocationPostRequest) =>
    LocationsCollection.locationsCreateLocationPost(variables.locationId),
});
