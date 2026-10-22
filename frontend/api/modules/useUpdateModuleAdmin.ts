import { createMutation, inferData } from 'react-query-kit';
import { ModulesCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetModuleAdmins } from './useGetModuleAdmins';

type UpdateModuleAdminParams = {
  moduleId: number;
  body: Parameters<typeof ModulesCollection.modulesUpdateModuleAdmin>[1];
};

export const useUpdateModuleAdmin = createMutation({
  mutationFn: async (variables: UpdateModuleAdminParams) =>
    ModulesCollection.modulesUpdateModuleAdmin(variables.moduleId, variables.body),
  onSuccess: (data, variables) => {
    const moduleId = variables.moduleId;
    const userId = data.data.userId;
    if (moduleId && userId) {
      const moduleAdminsQueryKey = useGetModuleAdmins.getKey(moduleId);
      queryClient.setQueryData<inferData<typeof useGetModuleAdmins>>(
        moduleAdminsQueryKey,
        (moduleAdmins) => {
          return (
            moduleAdmins?.map((moduleAdmin) => {
              if (moduleAdmin.userId === userId) {
                return data.data;
              }
              return moduleAdmin;
            }) ?? []
          );
        },
      );
    }
  },
});
