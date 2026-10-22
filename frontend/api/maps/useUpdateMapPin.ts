import { createMutation, inferData } from 'react-query-kit';
import { MapsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMapPins } from './useGetMapPins';

export interface UpdateMapPinRequest {
  mapId: number;
  pinId: number;
  body: Parameters<typeof MapsCollection.mapsUpdateMapPin>[2];
}

export const useUpdateMapPin = createMutation({
  mutationFn: async (variables: UpdateMapPinRequest) =>
    MapsCollection.mapsUpdateMapPin(variables.mapId, variables.pinId, variables.body),
  onSuccess: (data, variables) => {
    const { mapId, pinId } = variables;
    if (mapId) {
      const mapPinsQueryKey = useGetMapPins.getKey(mapId);
      queryClient.setQueryData<inferData<typeof useGetMapPins>>(mapPinsQueryKey, (oldData) =>
        (oldData ?? []).map((c) => (c.id === pinId ? data.data : c)),
      );
    }
  },
});
