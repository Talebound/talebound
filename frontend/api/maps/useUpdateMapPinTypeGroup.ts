import { createMutation, inferData } from 'react-query-kit';
import { MapsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMapPinTypesAndGroups } from './useGetMapPinTypesAndGroups';

export interface UpdateMapPinTypeGroupRequest {
  moduleId: number;
  mapPinTypeGroupId: number;
  body: Parameters<typeof MapsCollection.mapsUpdateMapPinTypeGroup>[2];
}

export const useUpdateMapPinTypeGroup = createMutation({
  mutationFn: async (variables: UpdateMapPinTypeGroupRequest) =>
    MapsCollection.mapsUpdateMapPinTypeGroup(
      variables.moduleId,
      variables.mapPinTypeGroupId,
      variables.body,
    ),
  onSuccess: (data, variables) => {
    const { moduleId, mapPinTypeGroupId } = variables;
    const newData = data.data;
    console.log('NEW DATA: ', newData, moduleId, mapPinTypeGroupId);
    if (moduleId && newData) {
      const queryKey = useGetMapPinTypesAndGroups.getKey(moduleId);
      queryClient.setQueryData<inferData<typeof useGetMapPinTypesAndGroups>>(
        queryKey,
        (oldData) => {
          return {
            ...oldData,
            pinTypeGroups: [
              ...(oldData?.pinTypeGroups ?? []).map((g) =>
                g.id === mapPinTypeGroupId ? { ...newData } : g,
              ),
            ],
          };
        },
      );
    }
  },
});
