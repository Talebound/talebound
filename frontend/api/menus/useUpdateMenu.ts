import { createMutation, inferData } from 'react-query-kit';
import { MenusCollection } from '../collections';
import { useGetMenuById } from './useGetMenuById';
import { queryClient } from '../../pages/_app';

type UpdateMenuParams = {
  menuId: number;
  body: Parameters<typeof MenusCollection.menusUpdateMenu>[1];
};

export const useUpdateMenu = createMutation({
  mutationFn: async (variables: UpdateMenuParams) =>
    MenusCollection.menusUpdateMenu(variables.menuId, variables.body),
  onSuccess: (data) => {
    const menuId = data.data.id;
    if (menuId) {
      const menuQueryKey = useGetMenuById.getKey(menuId);
      queryClient.setQueryData<inferData<typeof useGetMenuById>>(menuQueryKey, () => data.data);
    }
  },
});
