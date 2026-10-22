import { createMutation, inferData } from 'react-query-kit';
import { EntitiesCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMenuItemContent } from '../menus/useGetMenuItemContent';

export type CreateEntityGroupContentParams = {
  menuItemId: number;
  entityGroupId?: number;
  body: Parameters<typeof EntitiesCollection.entitiesCreateEntityGroupContent>[1];
};

export const useCreateEntityGroupContent = createMutation({
  mutationFn: async (variables: CreateEntityGroupContentParams) =>
    EntitiesCollection.entitiesCreateEntityGroupContent(variables.entityGroupId, variables.body),
  onSuccess: (data, variables) => {
    const entityGroupContent = data.data;
    if (entityGroupContent) {
      const getMenuItemContentQueryKey = useGetMenuItemContent.getKey({
        menuItemId: variables.menuItemId,
      });

      if (entityGroupContent) {
        queryClient.setQueryData<inferData<typeof useGetMenuItemContent>>(
          getMenuItemContentQueryKey,
          (oldData) => {
            const cachedData = oldData?.contents ?? [];

            return {
              ...oldData,
              contents: [
                ...cachedData.map((c) => {
                  if (!c.position) return c;

                  let position = c.position;
                  if (
                    c.entityGroupId === entityGroupContent.entityGroupId &&
                    c.position >= entityGroupContent.position
                  ) {
                    position++;
                  }

                  return {
                    ...c,
                    position,
                  };
                }),
                entityGroupContent,
              ],
            };
          },
        );
      }
    }
  },
});
