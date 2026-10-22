import { createQuery } from 'react-query-kit';
import { PbModuleAdmin } from '../../generated/api-types/data-contracts';
import { ModulesCollection } from '../collections';

export const useGetModuleAdmins = createQuery<PbModuleAdmin[], number>({
  queryKey: ['useGetModuleAdmins'],
  fetcher: async (variables) => {
    if (!variables) return [];
    const { data } = await ModulesCollection.modulesGetModuleAdmins(variables);
    return data.moduleAdmins ?? [];
  },
});
