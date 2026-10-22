import { createMutation, inferData } from 'react-query-kit';
import { EntitiesCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { sortGetMenuItemContent, useGetMenuItemContent } from '../menus/useGetMenuItemContent';
import {
  PbDeleteEntityGroupContentAction,
  PbEntityGroupContent,
} from '../../generated/api-types/data-contracts';

export type DeleteEntityGroupParams = {
  menuItemId: number;
  entityGroupId: number;
  deleteType: PbDeleteEntityGroupContentAction;
};

export const useDeleteEntityGroup = createMutation({
  mutationFn: async (variables: DeleteEntityGroupParams) =>
    EntitiesCollection.entitiesDeleteEntityGroup(variables.entityGroupId, variables.deleteType),
  onSuccess: (_, variables) => {
    const { menuItemId, entityGroupId, deleteType } = variables;

    const getMenuItemContentQueryKey = useGetMenuItemContent.getKey({
      menuItemId,
    });

    queryClient.setQueryData<inferData<typeof useGetMenuItemContent>>(
      getMenuItemContentQueryKey,
      (oldData) => {
        if (!oldData?.contents) return;

        const foundEGC = oldData.contents.find((e) => e.contentEntityGroupId === entityGroupId);
        console.log('FOUND ENTITY GROUP: ', foundEGC);
        if (!foundEGC) return;
        if (foundEGC.position === undefined) return;

        const groupChildren = oldData.contents.filter((c) => c.entityGroupId === entityGroupId);

        const childrenToDeleteIds: number[] = [];
        if (deleteType === PbDeleteEntityGroupContentAction.DELETE_EGC_ACTION_DELETE_CHILDREN) {
          const queue = [...groupChildren];
          while (queue.length > 0) {
            const element = queue.pop();
            if (element?.id) {
              childrenToDeleteIds.push(element.id);
              if (element.contentEntityGroupId) {
                queue.push(
                  ...oldData.contents.filter(
                    (c) => c.entityGroupId === element.contentEntityGroupId,
                  ),
                );
              }
            }
          }
        }

        const contents: PbEntityGroupContent[] = [];

        oldData.contents.forEach((c) => {
          if (
            deleteType === PbDeleteEntityGroupContentAction.DELETE_EGC_ACTION_DELETE_CHILDREN &&
            childrenToDeleteIds.includes(c.id ?? 0)
          )
            return;

          const position = c.position ?? 0;
          if (c.entityGroupId === entityGroupId) {
            contents.push({
              ...c,
              entityGroupId: foundEGC.entityGroupId,
              position: position - 1 + (foundEGC.position ?? 0),
            });
          } else if (
            position > (foundEGC.position ?? 0) &&
            foundEGC.entityGroupId === c.entityGroupId
          ) {
            contents.push({
              ...c,
              position:
                position -
                1 +
                (deleteType === PbDeleteEntityGroupContentAction.DELETE_EGC_ACTION_DELETE_CHILDREN
                  ? 0
                  : groupChildren.length),
            });
          } else if (entityGroupId !== c.contentEntityGroupId) {
            contents.push(c);
          }
        });

        console.log('NEW CONTENTS: ', contents);

        return { ...oldData, contents: sortGetMenuItemContent(contents) };
      },
    );
  },
});
