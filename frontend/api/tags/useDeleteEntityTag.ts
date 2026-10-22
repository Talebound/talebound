import { createMutation } from 'react-query-kit';
import { TagsCollection } from '../collections';

interface DeleteEntityTagParams {
  entityId: number;
  tagId: number;
}

export const useDeleteEntityTag = createMutation({
  mutationFn: async (variables: DeleteEntityTagParams) =>
    TagsCollection.tagsDeleteEntityTag(variables.entityId, variables.tagId),
  onSuccess: () => {
    /* TODO: implement this */
  },
});
