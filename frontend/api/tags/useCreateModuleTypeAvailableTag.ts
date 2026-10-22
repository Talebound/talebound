import { createMutation, inferData } from 'react-query-kit';
import { PbCreateModuleTypeAvailableTagRequest } from '../../generated/api-types/data-contracts';
import { TagsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetModuleTypeAvailableTags } from './useGetModuleTypeAvailableTags';

export const useCreateModuleTypeAvailableTag = createMutation({
  mutationFn: async (variables: PbCreateModuleTypeAvailableTagRequest) =>
    TagsCollection.tagsCreateModuleTypeAvailableTag(variables),
  onSuccess: (data) => {
    const newTag = data.data;
    if (newTag) {
      const availableModuleTypeTagsQueryKey = useGetModuleTypeAvailableTags.getKey(
        newTag.moduleType,
      );
      queryClient.setQueryData<inferData<typeof useGetModuleTypeAvailableTags>>(
        availableModuleTypeTagsQueryKey,
        (oldData) => {
          return [...(oldData ?? []), newTag];
        },
      );
    }
  },
});
