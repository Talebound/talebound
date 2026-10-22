import { createMutation } from 'react-query-kit';
import { UsersCollection } from '../collections';
import { PbCreateUserRequest } from '../../generated/api-types/data-contracts';

export const useCreateUser = createMutation({
  mutationFn: async (variables: PbCreateUserRequest) => UsersCollection.usersCreateUser(variables),
});
