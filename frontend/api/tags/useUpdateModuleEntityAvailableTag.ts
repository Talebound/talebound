import { createMutation, inferData } from 'react-query-kit';
import { TagsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetModuleEntityAvailableTags } from './useGetModuleEntityAvailableTags';

export interface UpdateModuleEntityAvailableTagRequest {
  tagId: number;
  newTag: string;
}

export const useUpdateModuleEntityAvailableTag = createMutation({
  mutationFn: async (variables: UpdateModuleEntityAvailableTagRequest) =>
    TagsCollection.tagsUpdateModuleEntityAvailableTag(variables.tagId, {
      newTag: variables.newTag,
    }),
  onSuccess: (data) => {
    const { id, tag, moduleId } = data.data;

    const availableModuleEntityTagsQueryKey = useGetModuleEntityAvailableTags.getKey(moduleId);
    queryClient.setQueryData<inferData<typeof useGetModuleEntityAvailableTags>>(
      availableModuleEntityTagsQueryKey,
      (oldData) => {
        const index = oldData?.findIndex((tag) => tag.id === id);
        if (oldData && index !== undefined && index !== -1) {
          oldData[index].tag = tag;
        }
        return oldData;
      },
    );
  },
});
