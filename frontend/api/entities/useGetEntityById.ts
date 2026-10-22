import { createSuspenseQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbViewEntity } from '../../generated/api-types/data-contracts';
import { EntitiesCollection } from '../collections';
import { entityAdapterSlice, entitySelectors } from '../../adapters/EntityAdapter';
import { store } from '../../store';

export const useGetEntityById = createSuspenseQuery<PbViewEntity, number, TaleboundError>({
  primaryKey: 'useGetEntityById',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (!variables) return {};
    const entity = entitySelectors.selectById(store.getState(), variables);
    if (!entity) {
      const { data } = await EntitiesCollection.entitiesGetEntityById(variables);
      store.dispatch(entityAdapterSlice.actions.upsertEntity(data));
      return data;
    }
    return entity;
  },
});
