import { createMutation, inferData } from 'react-query-kit';
import { MapsCollection } from '../collections';
import { useGetMapPinTypesAndGroups } from './useGetMapPinTypesAndGroups';
import { queryClient } from '../../pages/_app';

export interface CreateMapPinTypeRequest {
  moduleId: number;
  body: Parameters<typeof MapsCollection.mapsCreateMapPinTypeGroup>[1];
}

export const useCreateMapPinTypeGroup = createMutation({
  mutationFn: async (variables: CreateMapPinTypeRequest) =>
    MapsCollection.mapsCreateMapPinTypeGroup(variables.moduleId, variables.body),
  onSuccess: (data, variables) => {
    const { moduleId } = variables;
    if (moduleId) {
      const queryKey = useGetMapPinTypesAndGroups.getKey(moduleId);
      queryClient.setQueryData<inferData<typeof useGetMapPinTypesAndGroups>>(
        queryKey,
        (oldData) => ({
          ...oldData,
          pinTypeGroups: [...(oldData?.pinTypeGroups ?? []), data.data],
        }),
      );
    }
  },
});
