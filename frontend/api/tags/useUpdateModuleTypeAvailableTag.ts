import { createMutation, inferData } from 'react-query-kit';
import { TagsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetModuleTypeAvailableTags } from './useGetModuleTypeAvailableTags';

export interface UpdateAvailableWorldTagRequest {
  tagId: number;
  newTag: string;
}

export const useUpdateModuleTypeAvailableTag = createMutation({
  mutationFn: async (variables: UpdateAvailableWorldTagRequest) =>
    TagsCollection.tagsUpdateModuleTypeAvailableTag(variables.tagId, {
      newTag: variables.newTag,
    }),
  onSuccess: (data) => {
    const { moduleType, id, tag } = data.data;

    const availableModuleTypeTagsQueryKey = useGetModuleTypeAvailableTags.getKey(moduleType);
    queryClient.setQueryData<inferData<typeof useGetModuleTypeAvailableTags>>(
      availableModuleTypeTagsQueryKey,
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
