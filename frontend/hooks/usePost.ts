import { PbPost } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { TaleboundError } from '../utils/types/error';
import { useGetPostById } from '../api/posts/useGetPostById';
import { useSelector } from 'react-redux';
import { postSelectors } from '../adapters/PostAdapter';

interface UsePostResponse {
  post: PbPost | undefined;
  isFetching: boolean;
  error: TaleboundError | null;
}

export const usePost = (postId: number | undefined): UsePostResponse => {
  const { isFetching, error } = useGetPostById({ variables: postId });
  const post = useSelector((state) => postSelectors.selectById(state, postId ?? 0));

  return useMemo(
    () => ({
      post,
      isFetching,
      error,
    }),
    [post, isFetching, error],
  );
};
