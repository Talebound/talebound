import { createMutation, inferData } from 'react-query-kit';
import { MapsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { store } from '../../store';
import { useGetMapById } from './useGetMapById';
import { mapAdapterSlice } from '../../adapters/MapAdapter';

export interface UpdateMapRequest {
  mapId: number;
  body: Parameters<typeof MapsCollection.mapsUpdateMap>[1];
}

export const useUpdateMap = createMutation({
  mutationFn: async (variables: UpdateMapRequest) =>
    MapsCollection.mapsUpdateMap(variables.mapId, variables.body),
  onSuccess: (data, variables) => {
    const { mapId } = variables;
    if (mapId) {
      const mapQueryKey = useGetMapById.getKey(mapId);
      queryClient.setQueryData<inferData<typeof useGetMapById>>(mapQueryKey, () => data.data);
      store.dispatch(mapAdapterSlice.actions.upsertMap(data.data));
    }
  },
});
