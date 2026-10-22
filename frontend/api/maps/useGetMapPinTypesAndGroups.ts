import { createQuery } from 'react-query-kit';
import { PbGetModuleMapPinTypesResponse } from '../../generated/api-types/data-contracts';
import { MapsCollection } from '../collections';

export const useGetMapPinTypesAndGroups = createQuery<PbGetModuleMapPinTypesResponse, number>({
  primaryKey: 'useGetMapPinTypes',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (!variables) return {};
    const { data } = await MapsCollection.mapsGetModuleMapPinTypes(variables);
    return data;
  },
});
