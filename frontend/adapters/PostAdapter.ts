import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { PbPost } from '../generated/api-types/data-contracts';
import { ReduxState } from '../store';
import { createSelector } from 'reselect';

export const PostAdapter = createEntityAdapter<PbPost>({
  selectId: (post) => post.id!,
  sortComparer: (a, b) => a.id! - b.id!,
});

export const postAdapterSlice = createSlice({
  name: 'posts',
  initialState: PostAdapter.getInitialState(),
  reducers: {
    addPosts: PostAdapter.addMany,
    addPost: PostAdapter.addOne,
    removePost: PostAdapter.removeOne,
    updatePost: PostAdapter.updateOne,
    upsertPost: PostAdapter.upsertOne,
    upsertPosts: PostAdapter.upsertMany,
    removePosts: PostAdapter.removeMany,
    removeAllPosts: PostAdapter.removeAll,
  },
});

export const postSelectors = PostAdapter.getSelectors<ReduxState>(
  (state) => state[postAdapterSlice.name],
);

export const selectPostsByIds = createSelector(
  [postSelectors.selectEntities, (_, ids: number[]) => ids],
  (entities, ids) => ids.map((id) => entities[id]).filter(Boolean),
);

// And then use the selectors to retrieve values
// const _allPosts = postSelectors.selectAll(store.getState());

// const posts = useSelector((state) => selectPostsByIds(state, postIds));
