import { createQuery } from 'react-query-kit';
import { UserRolesCollection } from '../collections';
import { PbRole } from '../../generated/api-types/data-contracts';

export const useGetUserRoles = createQuery<PbRole[], number>({
  primaryKey: 'useGetUserRoles',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (!variables) return [];
    const { data } = await UserRolesCollection.usersGetUserRoles({ userId: variables });
    return data.role ?? [];
  },
});
