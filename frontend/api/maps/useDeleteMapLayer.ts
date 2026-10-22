import { createMutation, inferData } from 'react-query-kit';
import { MapsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMapLayers } from './useGetMapLayers';

interface DeleteMapLayerParams {
  mapId: number;
  mapLayerId: number;
}

export const useDeleteMapLayer = createMutation({
  mutationFn: async (variables: DeleteMapLayerParams) =>
    MapsCollection.mapsDeleteMapLayer(variables.mapId, variables.mapLayerId),
  onSuccess: (_, variables) => {
    const mapId = variables.mapId;
    const mapLayerId = variables.mapLayerId;
    if (mapId && mapLayerId) {
      const mapLayersQueryKey = useGetMapLayers.getKey(mapId);
      queryClient.setQueryData<inferData<typeof useGetMapLayers>>(
        mapLayersQueryKey,
        (oldData) => oldData?.filter((d) => d.id !== mapLayerId) ?? [],
      );
    }
  },
});
