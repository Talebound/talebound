import { createMutation } from 'react-query-kit';
import { TagsCollection } from '../collections';

interface CreateEntityTagParams {
  entityId: number;
  tagId: number;
}

export const useCreateEntityTag = createMutation({
  mutationFn: async (variables: CreateEntityTagParams) =>
    TagsCollection.tagsCreateEntityTag(variables.entityId, { tagId: variables.tagId }),
  onSuccess: () => {
    /* TODO: implement this */
  },
});
