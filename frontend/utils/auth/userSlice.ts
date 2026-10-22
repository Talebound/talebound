import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PbUser } from '../../generated/api-types/data-contracts';
import { getItem, LSKey, setItem } from '../../store/localStore';
import { UserRole } from './userUtils';

export interface UserState {
  user: PbUser | undefined;
  role: UserRole | undefined;
}

const initialState: UserState = {
  user: getItem(LSKey.USER),
  role: undefined,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<PbUser | undefined>) => {
      setItem(LSKey.USER, action.payload);
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<PbUser>) => {
      if (state.user) {
        Object.assign(state.user, action.payload);
      } else {
        state.user = action.payload;
      }
      setItem(LSKey.USER, state.user);
    },
    setUserRole: (state, action: PayloadAction<UserRole | undefined>) => {
      state.role = action.payload;
    },
    resetAuth: () => {
      setUser(undefined);
      setUserRole(undefined);
    },
  },
});

export const { setUser, updateUser, setUserRole, resetAuth } = userSlice.actions;

export const userReducer = userSlice.reducer;
