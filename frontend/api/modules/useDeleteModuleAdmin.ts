import { createMutation, inferData } from 'react-query-kit';
import { ModulesCollection } from '../collections';
import { useGetModuleAdmins } from './useGetModuleAdmins';
import { queryClient } from '../../pages/_app';

interface DeleteModuleAdminParams {
  moduleId: number;
  userId: number;
}

export const useDeleteModuleAdmin = createMutation({
  mutationFn: async (variables: DeleteModuleAdminParams) =>
    ModulesCollection.modulesDeleteModuleAdmin(variables.moduleId, { userId: variables.userId }),
  onSuccess: (_, variables) => {
    const moduleId = variables.moduleId;
    const userId = variables.userId;
    if (moduleId && userId) {
      const moduleAdminsQueryKey = useGetModuleAdmins.getKey(moduleId);
      queryClient.setQueryData<inferData<typeof useGetModuleAdmins>>(
        moduleAdminsQueryKey,
        (moduleAdmins) => {
          return moduleAdmins?.filter((moduleAdmin) => moduleAdmin.userId !== userId) ?? [];
        },
      );
    }
  },
});
