import { createMutation, inferData } from 'react-query-kit';
import { PbCreateModuleEntityAvailableTagRequest } from '../../generated/api-types/data-contracts';
import { TagsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetModuleEntityAvailableTags } from './useGetModuleEntityAvailableTags';

export const useCreateModuleEntityAvailableTag = createMutation({
  mutationFn: async (variables: PbCreateModuleEntityAvailableTagRequest) =>
    TagsCollection.tagsCreateModuleEntityAvailableTag(variables),
  onSuccess: (data, { moduleId }) => {
    const newTag = data.data;
    if (newTag && moduleId) {
      const availableModuleEntityTagsQueryKey = useGetModuleEntityAvailableTags.getKey(moduleId);

      queryClient.setQueryData<inferData<typeof useGetModuleEntityAvailableTags>>(
        availableModuleEntityTagsQueryKey,
        (oldData) => {
          return [...(oldData ?? []), newTag];
        },
      );
    }
  },
});
