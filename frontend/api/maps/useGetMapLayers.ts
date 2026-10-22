import { createQuery } from 'react-query-kit';
import { PbViewMapLayer } from '../../generated/api-types/data-contracts';
import { MapsCollection } from '../collections';

export const useGetMapLayers = createQuery<PbViewMapLayer[], number>({
  primaryKey: 'useGetMapLayers',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (!variables) return [];
    const { data } = await MapsCollection.mapsGetMapLayers(variables);
    return data.layers ?? [];
  },
});
