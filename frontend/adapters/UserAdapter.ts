import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { PbUser } from '../generated/api-types/data-contracts';
import { ReduxState } from '../store';
import { createSelector } from 'reselect';

export const UserAdapter = createEntityAdapter<PbUser>({
  selectId: (user) => user.id!,
  sortComparer: (a, b) => a.id! - b.id!,
});

export const userAdapterSlice = createSlice({
  name: 'users',
  initialState: UserAdapter.getInitialState(),
  reducers: {
    addUsers: UserAdapter.addMany,
    addUser: UserAdapter.addOne,
    removeUser: UserAdapter.removeOne,
    updateUser: UserAdapter.updateOne,
    upsertUser: UserAdapter.upsertOne,
    upsertUsers: UserAdapter.upsertMany,
    removeUsers: UserAdapter.removeMany,
    removeAllUsers: UserAdapter.removeAll,
  },
});

export const userSelectors = UserAdapter.getSelectors<ReduxState>(
  (state) => state[userAdapterSlice.name],
);

export const selectUsersByIds = createSelector(
  [userSelectors.selectEntities, (_, ids: number[]) => ids],
  (entities, ids) => ids.map((id) => entities[id]).filter(Boolean),
);

// And then use the selectors to retrieve values
// const _allUsers = userSelectors.selectAll(store.getState());

// const users = useSelector((state) => selectUsersByIds(state, userIds));
