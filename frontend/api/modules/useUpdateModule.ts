import { createMutation, inferData } from 'react-query-kit';
import { ModulesCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetModuleById } from './useGetModuleById';
import { store } from '../../store';
import { moduleAdapterSlice } from '../../adapters/ModuleAdapter';

type UpdateModuleParams = {
  moduleId: number;
  body: Parameters<typeof ModulesCollection.modulesUpdateModule>[1];
};

export const useUpdateModule = createMutation({
  mutationFn: async (variables: UpdateModuleParams) =>
    ModulesCollection.modulesUpdateModule(variables.moduleId, variables.body),
  onSuccess: (data) => {
    const moduleId = data.data.id;
    if (moduleId) {
      const moduleQueryKey = useGetModuleById.getKey(moduleId);
      queryClient.setQueryData<inferData<typeof useGetModuleById>>(moduleQueryKey, () => {
        return data.data;
      });
      store.dispatch(moduleAdapterSlice.actions.upsertModule(data.data));
    }
  },
});
