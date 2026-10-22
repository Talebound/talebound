import { createQuery } from 'react-query-kit';
import { PbViewMapPin } from '../../generated/api-types/data-contracts';
import { MapsCollection } from '../collections';

export const useGetMapPins = createQuery<PbViewMapPin[], number>({
  primaryKey: 'useGetMapPins',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (!variables) return [];
    const { data } = await MapsCollection.mapsGetMapPins(variables);
    return data.pins ?? [];
  },
});
