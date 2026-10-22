import { createSuspenseQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbViewModule } from '../../generated/api-types/data-contracts';
import { ModulesCollection } from '../collections';
import { moduleAdapterSlice, moduleSelectors } from '../../adapters/ModuleAdapter';
import { store } from '../../store';

export const useGetModuleById = createSuspenseQuery<PbViewModule, number, TaleboundError>({
  queryKey: ['useGetModuleById'],
  fetcher: async (variables) => {
    if (!variables) {
      return {};
    }
    const module = moduleSelectors.selectById(store.getState(), variables);

    if (!module) {
      const { data } = await ModulesCollection.modulesGetModuleById(variables);
      store.dispatch(moduleAdapterSlice.actions.upsertModule(data));
      return data;
    }

    return module;
  },
});
