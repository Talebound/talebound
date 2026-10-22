import { createSuspenseQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbSystem } from '../../generated/api-types/data-contracts';
import { SystemsCollection } from '../collections';
import { systemAdapterSlice, systemSelectors } from '../../adapters/SystemAdapter';
import { store } from '../../store';

export const useGetSystemById = createSuspenseQuery<PbSystem, number, TaleboundError>({
  primaryKey: 'useGetSystemById',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (variables === 0) return {};

    const system = systemSelectors.selectById(store.getState(), variables);

    if (!system) {
      const { data } = await SystemsCollection.systemsGetSystemById(variables);
      store.dispatch(systemAdapterSlice.actions.upsertSystem(data));
      return data;
    }

    return system;
  },
});
