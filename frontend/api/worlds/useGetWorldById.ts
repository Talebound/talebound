import { createSuspenseQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbWorld } from '../../generated/api-types/data-contracts';
import { WorldsCollection } from '../collections';
import { worldAdapterSlice, worldSelectors } from '../../adapters/WorldAdapter';
import { store } from '../../store';

export const useGetWorldById = createSuspenseQuery<PbWorld, number, TaleboundError>({
  primaryKey: 'useGetWorldById',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (variables === 0) return {};

    const world = worldSelectors.selectById(store.getState(), variables);

    if (!world) {
      const { data } = await WorldsCollection.worldsGetWorldById(variables);
      store.dispatch(worldAdapterSlice.actions.upsertWorld(data));
      return data;
    }

    return world;
  },
});
