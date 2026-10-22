import { createMutation } from 'react-query-kit';
import { UsersCollection } from '../collections';
import { PbUpdateUserRequest } from '../../generated/api-types/data-contracts';

export const useUpdateUser = createMutation({
  mutationFn: async (variables: PbUpdateUserRequest) => UsersCollection.usersUpdateUser(variables),
});
