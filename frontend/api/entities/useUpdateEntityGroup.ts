import { createMutation, inferData } from 'react-query-kit';
import { EntitiesCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMenuItemContent } from '../menus/useGetMenuItemContent';

export type UpdateEntityGroupParams = {
  menuItemId: number;
  entityGroupId: number;
  body: Parameters<typeof EntitiesCollection.entitiesUpdateEntityGroup>[1];
};

export const useUpdateEntityGroup = createMutation({
  mutationFn: async (variables: UpdateEntityGroupParams) =>
    EntitiesCollection.entitiesUpdateEntityGroup(variables.entityGroupId, variables.body),
  onSuccess: (data, variables) => {
    const newData = data.data;
    if (newData) {
      const getMenuItemContentQueryKey = useGetMenuItemContent.getKey({
        menuItemId: variables.menuItemId,
      });

      queryClient.setQueryData<inferData<typeof useGetMenuItemContent>>(
        getMenuItemContentQueryKey,
        (oldData) => ({
          ...oldData,
          groups: (oldData?.groups ?? []).map((g) =>
            g.id === variables.entityGroupId ? newData : g,
          ),
        }),
      );
    }
  },
});
