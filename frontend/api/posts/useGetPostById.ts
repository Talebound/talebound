import { createSuspenseQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbPost } from '../../generated/api-types/data-contracts';
import { PostsCollection } from '../collections';
import { postAdapterSlice, postSelectors } from '../../adapters/PostAdapter';
import { store } from '../../store';

export const useGetPostById = createSuspenseQuery<PbPost, number, TaleboundError>({
  primaryKey: 'useGetPostById',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (!variables) return {};
    const post = postSelectors.selectById(store.getState(), variables);
    if (!post) {
      const { data } = await PostsCollection.postsGetPostById(variables);
      store.dispatch(postAdapterSlice.actions.upsertPost(data));
      return data;
    }
    return post;
  },
});
