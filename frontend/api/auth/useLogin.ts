import { createMutation } from 'react-query-kit';
import { PbLoginUserRequest } from '../../generated/api-types/data-contracts';
import { AuthCollection } from '../collections';

export const useLogin = createMutation({
  mutationFn: async (variables: PbLoginUserRequest) => AuthCollection.authLoginUser(variables),
});
