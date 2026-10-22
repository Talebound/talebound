import { createMutation, inferData } from 'react-query-kit';
import { EntitiesCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMenuItemContent } from '../menus/useGetMenuItemContent';

export type DeleteEntityGroupContentParams = {
  menuItemId: number;
  entityGroupId: number;
  contentId: number;
};

export const useDeleteEntityGroupContent = createMutation({
  mutationFn: async (variables: DeleteEntityGroupContentParams) =>
    EntitiesCollection.entitiesDeleteEntityGroupContent(
      variables.entityGroupId,
      variables.contentId,
    ),
  onSuccess: (_, variables) => {
    const { menuItemId, contentId } = variables;

    const getMenuItemContentQueryKey = useGetMenuItemContent.getKey({
      menuItemId,
    });

    queryClient.setQueryData<inferData<typeof useGetMenuItemContent>>(
      getMenuItemContentQueryKey,
      (oldData) => {
        if (!oldData?.contents) return;

        return { ...oldData, contents: [...oldData.contents.filter((c) => c.id !== contentId)] };
      },
    );
  },
});
