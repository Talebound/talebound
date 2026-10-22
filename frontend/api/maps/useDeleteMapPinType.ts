import { createMutation, inferData } from 'react-query-kit';
import { MapsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMapPinTypesAndGroups } from './useGetMapPinTypesAndGroups';

interface DeleteMapPinTypeParams {
  mapId: number;
  pinTypeId: number;
}

export const useDeleteMapPinType = createMutation({
  mutationFn: async (variables: DeleteMapPinTypeParams) =>
    MapsCollection.mapsDeleteMapPinType(variables.mapId, variables.pinTypeId),
  onSuccess: (_, variables) => {
    const { mapId, pinTypeId } = variables;
    if (mapId && pinTypeId) {
      const mapPinTypesQueryKey = useGetMapPinTypesAndGroups.getKey(mapId);
      queryClient.setQueryData<inferData<typeof useGetMapPinTypesAndGroups>>(
        mapPinTypesQueryKey,
        (oldData) => {
          return {
            ...oldData,
            pinTypes: [...(oldData?.pinTypes ?? []).filter((g) => g.id !== pinTypeId)],
          };
        },
      );
    }
  },
});
