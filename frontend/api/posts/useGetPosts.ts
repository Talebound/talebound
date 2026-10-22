import { createInfiniteQuery } from 'react-query-kit';
import { PostsCollection } from '../collections';
import { expandDataForInfiniteQuery, InfiniteResponse } from '../apiLib';
import { store } from '../../store';
import { postAdapterSlice } from '../../adapters/PostAdapter';

export const PAGE_SIZE_POSTS = 3;

type GetPostsParams = NonNullable<Parameters<typeof PostsCollection.postsGetPosts>[0]>;

export interface GetPostsResponse {
  postIds: number[];
  totalCount: number;
}

export const useGetPosts = createInfiniteQuery<
  InfiniteResponse<GetPostsResponse>,
  GetPostsParams,
  Error,
  number
>({
  primaryKey: 'useGetPosts',
  queryFn: async ({ queryKey: [_primaryKey, variables], pageParam: offset }) => {
    const { data } = await PostsCollection.postsGetPosts({
      ...variables,
      limit: PAGE_SIZE_POSTS,
      offset,
    });

    if (data.posts) {
      store.dispatch(postAdapterSlice.actions.upsertPosts(data.posts));
    }

    return expandDataForInfiniteQuery(
      { postIds: data.posts!.map((p) => p.id ?? 0), totalCount: data.totalCount ?? 0 },
      offset,
      PAGE_SIZE_POSTS,
      data.totalCount,
    );
  },

  // use: [queryModuleMiddleware],

  getNextPageParam: (lastPage, _pages) => {
    return lastPage.newOffset;
  },

  initialPageParam: 0,
});
