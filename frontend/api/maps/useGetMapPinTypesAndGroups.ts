import { createQuery } from 'react-query-kit';
import { PbGetModuleMapPinTypesResponse } from '../../generated/api-types/data-contracts';
import { MapsCollection } from '../collections';

export const useGetMapPinTypesAndGroups = createQuery<PbGetModuleMapPinTypesResponse, number>({
  queryKey: ['useGetMapPinTypes'],
  fetcher: async (variables) => {
    if (!variables) return {};
    const { data } = await MapsCollection.mapsGetModuleMapPinTypes(variables);
    return data;
  },
});
