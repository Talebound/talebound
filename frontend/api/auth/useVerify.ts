import { createMutation } from 'react-query-kit';
import { AuthCollection } from '../collections';
import { PbVerifyEmailRequest } from '../../generated/api-types/data-contracts';

export const useVerify = createMutation({
  mutationFn: async (variables: PbVerifyEmailRequest) => AuthCollection.authVerifyEmail(variables),
});
