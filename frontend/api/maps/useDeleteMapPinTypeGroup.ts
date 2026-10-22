import { createMutation, inferData } from 'react-query-kit';
import { MapsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMapPinTypesAndGroups } from './useGetMapPinTypesAndGroups';

interface DeleteMapPinTypeGroupParams {
  moduleId: number;
  mapPinTypeGroupId: number;
}

export const useDeleteMapPinTypeGroup = createMutation({
  mutationFn: async (variables: DeleteMapPinTypeGroupParams) =>
    MapsCollection.mapsDeleteMapPinTypeGroup(variables.moduleId, variables.mapPinTypeGroupId),
  onSuccess: (_, variables) => {
    const { moduleId, mapPinTypeGroupId } = variables;
    if (moduleId && mapPinTypeGroupId) {
      const queryKey = useGetMapPinTypesAndGroups.getKey(moduleId);
      queryClient.setQueryData<inferData<typeof useGetMapPinTypesAndGroups>>(
        queryKey,
        (oldData) => {
          return {
            ...oldData,
            pinTypeGroups: [
              ...(oldData?.pinTypeGroups ?? []).filter((g) => g.id !== mapPinTypeGroupId),
            ],
          };
        },
      );
    }
  },
});
