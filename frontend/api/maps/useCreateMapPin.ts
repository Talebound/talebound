import { createMutation, inferData } from 'react-query-kit';
import { MapsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMapPins } from './useGetMapPins';

export interface CreateMapPinRequest {
  mapId: number;
  body: Parameters<typeof MapsCollection.mapsCreateMapPin>[1];
}

export const useCreateMapPin = createMutation({
  mutationFn: async (variables: CreateMapPinRequest) =>
    MapsCollection.mapsCreateMapPin(variables.mapId, variables.body),
  onSuccess: (data, variables) => {
    const { mapId } = variables;
    if (mapId) {
      const mapPinQueryKey = useGetMapPins.getKey(mapId);
      queryClient.setQueryData<inferData<typeof useGetMapPins>>(mapPinQueryKey, (oldData) => [
        ...(oldData ?? []),
        data.data,
      ]);
    }
  },
});
