import { createMutation, inferData } from 'react-query-kit';
import { PostsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetPostById } from './useGetPostById';
import { store } from '../../store';
import { postAdapterSlice } from '../../adapters/PostAdapter';

export interface UpdatePostRequest {
  postId: number;
  body: Parameters<typeof PostsCollection.postsUpdatePost>[1];
}

export const useUpdatePost = createMutation({
  mutationFn: async (variables: UpdatePostRequest) =>
    PostsCollection.postsUpdatePost(variables.postId, variables.body),
  onSuccess: (data, variables) => {
    const { postId } = variables;
    console.log('TEST2', variables);
    if (postId) {
      const postQueryKey = useGetPostById.getKey(postId);
      queryClient.setQueryData<inferData<typeof useGetPostById>>(postQueryKey, () => data.data);
      store.dispatch(postAdapterSlice.actions.upsertPost(data.data));
    }
  },
});
