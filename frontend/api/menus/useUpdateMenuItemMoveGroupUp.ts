import { createMutation, inferData } from 'react-query-kit';
import { MenusCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMenuItems } from './useGetMenuItems';
import { sortByPosition } from '../../utils/functions/sortByPosition';

export type MoveGroupUpParams = {
  menuId: number;
  menuItemId: number;
};

export const useUpdateMenuItemMoveGroupUp = createMutation({
  mutationFn: async (variables: MoveGroupUpParams) =>
    MenusCollection.menusUpdateMenuItemMoveGroupUp(variables.menuId, variables.menuItemId),

  onMutate: async (variables) => {
    const getMenuItemsQueryKey = useGetMenuItems.getKey(variables.menuId);
    const previousData = queryClient.getQueryData(getMenuItemsQueryKey) as inferData<
      typeof useGetMenuItems
    >;
    return { previousData, getMenuItemsQueryKey };
  },

  onError: (_err, _variables, context) => {
    if (context?.previousData) {
      queryClient.setQueryData<inferData<typeof useGetMenuItems>>(context.getMenuItemsQueryKey, []);
      queryClient.setQueryData<inferData<typeof useGetMenuItems>>(context.getMenuItemsQueryKey, [
        ...context.previousData,
      ]);
    }
  },

  onSuccess: (_data, variables) => {
    const { menuId, menuItemId } = variables;
    const getMenuItemsQueryKey = useGetMenuItems.getKey(menuId);

    queryClient.setQueryData<inferData<typeof useGetMenuItems>>(getMenuItemsQueryKey, (oldData) => {
      // Assuming oldData is sorted by position.

      if (oldData) {
        const sortedData = oldData.sort(sortByPosition);
        const mainItemPositions = sortedData.filter((i) => i.isMain).map((i) => i.position ?? -1);

        // 1. Find the target group and previous group.
        const targetGroupStartItem = sortedData.find((item) => item.id === menuItemId);
        const targetGroupStartPosition = targetGroupStartItem?.position ?? 0;
        if (!targetGroupStartItem || !mainItemPositions.includes(targetGroupStartPosition))
          return sortedData;

        let targetGroupEndPosition =
          mainItemPositions.find((p) => p > targetGroupStartPosition) ?? 0;
        if (!targetGroupEndPosition) {
          targetGroupEndPosition = sortedData.length;
        } else {
          targetGroupEndPosition--;
        }

        // 2. Find the previous group.
        const prevGroupStartPosition = mainItemPositions
          .filter((p) => p < targetGroupStartPosition)
          .reverse()[0];
        const prevGroupEndPosition = targetGroupStartPosition - 1;
        if (!prevGroupStartPosition) return sortedData;

        // If no previous group, don't do anything.
        if (
          prevGroupStartPosition <= 0 ||
          prevGroupEndPosition <= 0 ||
          targetGroupStartPosition <= 0 ||
          targetGroupEndPosition <= 0
        ) {
          return sortedData;
        }

        const targetGroupSize = targetGroupEndPosition - targetGroupStartPosition + 1;
        const prevGroupSize = prevGroupEndPosition - prevGroupStartPosition + 1;

        return sortedData
          .map((item) => {
            const p = item.position ?? 0;
            if (p >= prevGroupStartPosition && p <= prevGroupEndPosition) {
              return {
                ...item,
                position: p + targetGroupSize,
              };
            } else if (p >= targetGroupStartPosition && p <= targetGroupEndPosition) {
              return {
                ...item,
                position: p - prevGroupSize,
              };
            } else {
              //p < prevGroupStartPosition || p > targetGroupEndPosition
              return item;
            }
          })
          .sort(sortByPosition);
      }
      return oldData;
    });
  },
});
