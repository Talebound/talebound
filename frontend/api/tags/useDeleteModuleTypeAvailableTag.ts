import { createMutation, inferData } from 'react-query-kit';
import { TagsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetModuleTypeAvailableTags } from './useGetModuleTypeAvailableTags';
import { PbModuleType } from '../../generated/api-types/data-contracts';

interface DeleteModuleTypeAvailableTagRequest {
  tagId: number;
  moduleType: PbModuleType;
}

export const useDeleteModuleTypeAvailableTag = createMutation({
  mutationFn: async (variables: DeleteModuleTypeAvailableTagRequest) =>
    TagsCollection.tagsDeleteModuleTypeAvailableTag(variables.tagId),
  onSuccess: (_, { tagId, moduleType }) => {
    const availableModuleTypeTagsQueryKey = useGetModuleTypeAvailableTags.getKey(moduleType);
    console.log('availableModuleTypeTagsQueryKey!', availableModuleTypeTagsQueryKey);
    queryClient.setQueryData<inferData<typeof useGetModuleTypeAvailableTags>>(
      availableModuleTypeTagsQueryKey,
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
