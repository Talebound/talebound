import { createMutation, inferData } from 'react-query-kit';
import { MapsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { store } from '../../store';
import { useGetMapById } from './useGetMapById';
import { mapAdapterSlice } from '../../adapters/MapAdapter';

export interface DeleteMapRequest {
  mapId: number;
}

export const useDeleteMap = createMutation({
  mutationFn: async (variables: DeleteMapRequest) => MapsCollection.mapsDeleteMap(variables.mapId),
  onSuccess: (_data, variables) => {
    const { mapId } = variables;
    if (mapId) {
      const mapQueryKey = useGetMapById.getKey(mapId);
      queryClient.setQueryData<inferData<typeof useGetMapById>>(mapQueryKey, () => {
        return {};
      });
      store.dispatch(mapAdapterSlice.actions.removeMap(mapId));
    }
  },
});
