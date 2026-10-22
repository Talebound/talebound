import { createMutation, inferData } from 'react-query-kit';
import { MapsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMapPinTypesAndGroups } from './useGetMapPinTypesAndGroups';

export interface UpdateMapPinTypeRequest {
  moduleId: number;
  pinTypeId: number;
  body: Parameters<typeof MapsCollection.mapsUpdateMapPinType>[2];
}

export const useUpdateMapPinType = createMutation({
  mutationFn: async (variables: UpdateMapPinTypeRequest) =>
    MapsCollection.mapsUpdateMapPinType(variables.moduleId, variables.pinTypeId, variables.body),
  onSuccess: (data, variables) => {
    const { moduleId, pinTypeId } = variables;
    const newData = data.data.pinType;
    if (moduleId && newData) {
      const queryKey = useGetMapPinTypesAndGroups.getKey(moduleId);
      queryClient.setQueryData<inferData<typeof useGetMapPinTypesAndGroups>>(
        queryKey,
        (oldData) => {
          return {
            ...oldData,
            pinTypes: [
              ...(oldData?.pinTypes ?? []).map((g) => (g.id === pinTypeId ? { ...newData } : g)),
            ],
          };
        },
      );
    }
  },
});
