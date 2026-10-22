import { createMutation } from 'react-query-kit';
import { AuthCollection } from '../collections';

export const useLogout = createMutation({
  mutationFn: async () => AuthCollection.authLogoutUser({}),
});
