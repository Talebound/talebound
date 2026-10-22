import { createQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbViewMenu } from '../../generated/api-types/data-contracts';
import { MenusCollection } from '../collections';

export const useGetMenuById = createQuery<PbViewMenu, number, TaleboundError>({
  primaryKey: 'useGetMenuById',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (!variables) return {};
    const { data } = await MenusCollection.menusGetMenu(variables);
    return data;
  },
});
