import { createSuspenseQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbUser } from '../../generated/api-types/data-contracts';
import { UsersCollection } from '../collections';
import { userAdapterSlice, userSelectors } from '../../adapters/UserAdapter';
import { store } from '../../store';

export const useGetUserById = createSuspenseQuery<PbUser, number, TaleboundError>({
  primaryKey: 'useGetUserById',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (!variables) return {};
    const user = userSelectors.selectById(store.getState(), variables);
    if (!user) {
      const { data } = await UsersCollection.usersGetUserById(variables);
      store.dispatch(userAdapterSlice.actions.upsertUser(data));
      return data;
    }
    return user;
  },
});
