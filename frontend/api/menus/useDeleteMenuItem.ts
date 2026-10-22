import { createMutation, inferData } from 'react-query-kit';
import { MenusCollection } from '../collections';
import { useGetMenuItems } from './useGetMenuItems';
import { queryClient } from '../../pages/_app';
import { PbMenuItem } from '../../generated/api-types/data-contracts';

interface DeleteMenuItemParams {
  menuId: number;
  menuItemId: number;
}

export const useDeleteMenuItem = createMutation({
  mutationFn: async (variables: DeleteMenuItemParams) =>
    MenusCollection.menusDeleteMenuItem(variables.menuId, variables.menuItemId),
  onSuccess: (_, variables) => {
    const { menuId, menuItemId } = variables;
    if (menuId && menuItemId) {
      const menuItemsQueryKey = useGetMenuItems.getKey(menuId);
      queryClient.setQueryData<inferData<typeof useGetMenuItems>>(
        menuItemsQueryKey,
        (menuItems) => {
          // return menuItems?.filter((menuItem) => menuItem.id !== menuItemId) ?? [];
          const deletedItem = menuItems?.find((menuItem) => menuItem.id === menuItemId);
          const deletedPosition = deletedItem?.position;
          if (!deletedItem || !deletedPosition) return menuItems;

          return menuItems?.reduce<PbMenuItem[]>((acc, menuItem) => {
            if (menuItem.id !== menuItemId) {
              // Filtering condition (keep even numbers)
              const position = menuItem.position ?? 1;
              acc.push({
                ...menuItem,
                position: deletedPosition > position ? position : position - 1,
              });
            }
            return acc;
          }, []);
        },
      );
    }
  },
});
