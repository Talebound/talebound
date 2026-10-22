import { createMutation, inferData } from 'react-query-kit';
import { MapsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMapPinTypesAndGroups } from './useGetMapPinTypesAndGroups';

export interface CreateMapPinTypeRequest {
  moduleId: number;
  body: Parameters<typeof MapsCollection.mapsCreateMapPinType>[1];
}

export const useCreateMapPinType = createMutation({
  mutationFn: async (variables: CreateMapPinTypeRequest) =>
    MapsCollection.mapsCreateMapPinType(variables.moduleId, variables.body),
  onSuccess: (data, variables) => {
    const { moduleId } = variables;
    if (moduleId) {
      const queryKey = useGetMapPinTypesAndGroups.getKey(moduleId);
      queryClient.setQueryData<inferData<typeof useGetMapPinTypesAndGroups>>(
        queryKey,
        (oldData) => ({
          ...oldData,
          pinTypes: [...(oldData?.pinTypes ?? []), data.data],
        }),
      );
    }
  },
});
