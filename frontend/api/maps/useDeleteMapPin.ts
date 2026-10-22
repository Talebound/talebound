import { createMutation, inferData } from 'react-query-kit';
import { MapsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMapPins } from './useGetMapPins';

interface DeleteMapPinParams {
  mapId: number;
  pinId: number;
}

export const useDeleteMapPin = createMutation({
  mutationFn: async (variables: DeleteMapPinParams) =>
    MapsCollection.mapsDeleteMapPin(variables.mapId, variables.pinId),
  onSuccess: (_, variables) => {
    const { mapId, pinId } = variables;
    if (mapId && pinId) {
      const mapPinsQueryKey = useGetMapPins.getKey(mapId);
      queryClient.setQueryData<inferData<typeof useGetMapPins>>(
        mapPinsQueryKey,
        (oldData) => oldData?.filter((d) => d.id !== pinId) ?? [],
      );
    }
  },
});
