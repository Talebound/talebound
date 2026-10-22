import { createMutation } from 'react-query-kit';
import { PostsCollection } from '../collections';
import { PbCreatePostRequest } from '../../generated/api-types/data-contracts';

export const useCreatePost = createMutation({
  mutationFn: async (variables: PbCreatePostRequest) => PostsCollection.postsCreatePost(variables),
  onSuccess: (data, variables) => {
    const newPost = data.data;
    if (newPost && variables.moduleId) {
      // const getPostsQueryKey = useGetPosts.getKey(variables.module);
      // queryClient.setQueryData<inferData<typeof useGetLocations>>(
      //   getLocationsQueryKey,
      //   (locations) => {
      //     return [...(locations ?? []), newPost];
      //   },
      // );
    }
  },
});
