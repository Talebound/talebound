import { createMutation, inferData } from 'react-query-kit';
import { MapsCollection } from '../collections';
import { useGetMapLayers } from './useGetMapLayers';
import { queryClient } from '../../pages/_app';

export interface CreateMapLayerRequest {
  mapId: number;
  body: Parameters<typeof MapsCollection.mapsCreateMapLayer>[1];
}

export const useCreateMapLayer = createMutation({
  mutationFn: async (variables: CreateMapLayerRequest) =>
    MapsCollection.mapsCreateMapLayer(variables.mapId, variables.body),
  onSuccess: (data, variables) => {
    const { mapId } = variables;
    if (mapId) {
      const mapLayerQueryKey = useGetMapLayers.getKey(mapId);
      queryClient.setQueryData<inferData<typeof useGetMapLayers>>(mapLayerQueryKey, (oldData) => [
        ...(oldData ?? []),
        data.data,
      ]);
    }
  },
});
