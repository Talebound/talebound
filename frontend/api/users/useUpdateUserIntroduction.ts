import { createMutation, inferData } from 'react-query-kit';
import { UsersCollection } from '../collections';
import { useGetPostById } from '../posts/useGetPostById';
import { queryClient } from '../../pages/_app';
import { useGetUserById } from './useGetUserById';

export interface UpdateUserIntroductionRequest {
  userId: number;
  postId?: number;
  body: {
    content?: string;
    saveAsDraft?: boolean;
  };
}

export const useUpdateUserIntroduction = createMutation({
  mutationFn: async (variables: UpdateUserIntroductionRequest) =>
    UsersCollection.usersUpdateUserIntroduction(variables.userId, variables.body),
  onMutate: async (variables) => {
    const postQueryKey = useGetPostById.getKey(variables.postId);
    const previousData = queryClient.getQueryData(postQueryKey);

    if (variables.postId) {
      queryClient.setQueryData<inferData<typeof useGetPostById>>(postQueryKey, (oldData) => ({
        ...oldData,
        content: variables.body.content,
        isDraft: variables.body.saveAsDraft,
        lastUpdatedUserId: variables.userId,
      }));
    }

    return { previousData, postQueryKey };
  },
  onSuccess: (data, variables) => {
    const userQueryKey = useGetUserById.getKey(variables.userId);
    const postQueryKey = useGetPostById.getKey(data.data.id);
    if (data.data.id) {
      queryClient.setQueryData<inferData<typeof useGetPostById>>(postQueryKey, () => {
        return data.data;
      });
    }
    queryClient.setQueryData<inferData<typeof useGetUserById>>(userQueryKey, (oldData) => ({
      ...oldData,
      introductionPostId: data.data.id,
    }));
  },
  onError: (err, variables, context) => {
    if (context?.previousData) {
      queryClient.setQueryData<inferData<typeof useGetPostById>>(
        context.postQueryKey,
        context.previousData,
      );
    }
  },
});
