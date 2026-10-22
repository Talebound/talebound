import { createSuspenseQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbMap } from '../../generated/api-types/data-contracts';
import { MapsCollection } from '../collections';
import { mapAdapterSlice, mapSelectors } from '../../adapters/MapAdapter';
import { store } from '../../store';

export const useGetMapById = createSuspenseQuery<PbMap, number, TaleboundError>({
  primaryKey: 'useGetMapById',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (!variables) return {};
    const map = mapSelectors.selectById(store.getState(), variables);
    if (!map) {
      const { data } = await MapsCollection.mapsGetMapById(variables);
      store.dispatch(mapAdapterSlice.actions.upsertMap(data));
      return data;
    }
    return map;
  },
});
