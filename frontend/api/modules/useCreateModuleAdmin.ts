import { createMutation, inferData } from 'react-query-kit';
import { ModulesCollection } from '../collections';
import { useGetModuleAdmins } from './useGetModuleAdmins';
import { queryClient } from '../../pages/_app';

interface CreateModuleAdminProps {
  moduleId: number;
  motivationalLetter?: string;
}

export const useCreateModuleAdmin = createMutation({
  mutationFn: async (variables: CreateModuleAdminProps) =>
    ModulesCollection.modulesCreateModuleAdmin(variables.moduleId, {
      motivationalLetter: variables.motivationalLetter,
    }),
  onSuccess: (data, variables) => {
    const moduleId = variables.moduleId;
    const userId = data.data.userId;
    if (moduleId && userId) {
      const moduleAdminsQueryKey = useGetModuleAdmins.getKey(moduleId);
      queryClient.setQueryData<inferData<typeof useGetModuleAdmins>>(
        moduleAdminsQueryKey,
        (moduleAdmins) => {
          return [...(moduleAdmins ?? []), data.data];
        },
      );
    }
  },
});
