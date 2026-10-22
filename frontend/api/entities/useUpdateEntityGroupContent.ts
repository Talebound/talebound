import { createMutation, inferData } from 'react-query-kit';
import { EntitiesCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMenuItemContent } from '../menus/useGetMenuItemContent';

export type UpdateEntityGroupContentParams = {
  menuItemId: number;
  entityGroupId: number;
  contentId: number;
  body: Parameters<typeof EntitiesCollection.entitiesUpdateEntityGroupContent>[2];
};

export const useUpdateEntityGroupContent = createMutation({
  mutationFn: async (variables: UpdateEntityGroupContentParams) =>
    EntitiesCollection.entitiesUpdateEntityGroupContent(
      variables.entityGroupId,
      variables.contentId,
      variables.body,
    ),
  onSuccess: (data, variables) => {
    const newContent = data.data;
    const { contentId } = variables;
    if (newContent) {
      const getMenuItemContentQueryKey = useGetMenuItemContent.getKey({
        menuItemId: variables.menuItemId,
      });

      queryClient.setQueryData<inferData<typeof useGetMenuItemContent>>(
        getMenuItemContentQueryKey,
        (oldData) => {
          const cachedContents = oldData?.contents ?? [];
          const oldContent = cachedContents.find((c) => c.id === contentId);
          if (!oldContent) return oldData;

          return {
            ...oldData,
            contents: [
              ...cachedContents.map((c) => {
                if (c.id === contentId) return newContent;
                if (!c.position) return c;

                let positionToSave = c.position;
                const newDataPosition = newContent.position ?? 0;
                const oldDataPosition = oldContent.position ?? 0;
                const isTheSameGroup =
                  c.entityGroupId === newContent.entityGroupId &&
                  oldContent.entityGroupId === newContent.entityGroupId;

                if (c.entityGroupId === oldContent.entityGroupId) {
                  if (c.position > oldDataPosition) positionToSave--;
                }
                if (c.entityGroupId === newContent.entityGroupId) {
                  if (c.position >= newDataPosition) positionToSave++;
                }

                //if the movement was in the same group, we need to make some adjustments to the position
                if (isTheSameGroup) {
                  if (oldDataPosition < newDataPosition && c.position === newDataPosition) {
                    positionToSave--;
                  }
                }

                return {
                  ...c,
                  position: positionToSave,
                };
              }),
            ],
          };
        },
      );
    }
  },
});
