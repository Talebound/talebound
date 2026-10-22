import { createMutation, inferData } from 'react-query-kit';
import { MapsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMapLayers } from './useGetMapLayers';

export interface UpdateMapRequest {
  mapId: number;
  mapLayerId: number;
  body: Parameters<typeof MapsCollection.mapsUpdateMapLayer>[2];
}

export const useUpdateMapLayer = createMutation({
  mutationFn: async (variables: UpdateMapRequest) =>
    MapsCollection.mapsUpdateMapLayer(variables.mapId, variables.mapLayerId, variables.body),
  onSuccess: (data, variables) => {
    const { mapId, mapLayerId, body } = variables;
    if (mapId) {
      const mapLayerQueryKey = useGetMapLayers.getKey(mapId);
      queryClient.setQueryData<inferData<typeof useGetMapLayers>>(mapLayerQueryKey, (od) => {
        const oldData = od ?? [];
        const startPosition = oldData.find((c) => c.id === mapLayerId)?.position ?? 0;

        return oldData.map((c) => {
          if (c.id === mapLayerId) return data.data;

          const newPosition = body.position;
          if (newPosition && startPosition > 0) {
            const cPosition = c.position ?? 0;
            let finalPosition = cPosition;
            if (
              cPosition >= Math.min(newPosition, startPosition) &&
              cPosition <= Math.max(newPosition, startPosition)
            ) {
              if (startPosition < newPosition) {
                finalPosition--;
              } else if (startPosition > newPosition) {
                finalPosition++;
              }
            }
            return { ...c, position: finalPosition };
          }
          return c;
        });
      });
    }
  },
});
