import { createMutation, inferData } from 'react-query-kit';
import { MenusCollection } from '../collections';
import { useGetMenuItems } from './useGetMenuItems';
import { queryClient } from '../../pages/_app';

interface CreateMenuItemParams {
  menuId: number;
  body: Parameters<typeof MenusCollection.menusCreateMenuItem>[1];
}

export const useCreateMenuItem = createMutation({
  mutationFn: async (variables: CreateMenuItemParams) => {
    if (!variables.body.position) {
      const menuItemsQueryKey = useGetMenuItems.getKey(variables.menuId);
      const currentData = queryClient.getQueryData(menuItemsQueryKey) as inferData<
        typeof useGetMenuItems
      >;
      variables.body.position = currentData?.length + 1 ?? 1;
    }

    return MenusCollection.menusCreateMenuItem(variables.menuId, variables.body);
  },
  onSuccess: (data, variables) => {
    const { menuId } = variables;
    const newItem = data.data;
    if (menuId && newItem) {
      const menuItemsQueryKey = useGetMenuItems.getKey(menuId);
      queryClient.setQueryData<inferData<typeof useGetMenuItems>>(
        menuItemsQueryKey,
        (menuItems) => {
          return [...(menuItems ?? []), newItem];
        },
      );
    }
  },
});
