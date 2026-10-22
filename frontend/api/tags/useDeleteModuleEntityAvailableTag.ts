import { createMutation, inferData } from 'react-query-kit';
import { TagsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetModuleEntityAvailableTags } from './useGetModuleEntityAvailableTags';

interface DeleteModuleEntityAvailableTagRequest {
  tagId: number;
  moduleId: number;
}

export const useDeleteModuleEntityAvailableTag = createMutation({
  mutationFn: async (variables: DeleteModuleEntityAvailableTagRequest) =>
    TagsCollection.tagsDeleteModuleEntityAvailableTag(variables.tagId),
  onSuccess: (_, { tagId, moduleId }) => {
    const availableModuleEntityTagsQueryKey = useGetModuleEntityAvailableTags.getKey(moduleId);

    queryClient.setQueryData<inferData<typeof useGetModuleEntityAvailableTags>>(
      availableModuleEntityTagsQueryKey,
      (oldData) => {
        const index = oldData?.findIndex((tag) => tag.id === tagId);

        if (oldData && index !== undefined && index !== -1) {
          oldData.splice(index, 1);
        }
        return oldData;
      },
    );
  },
});
