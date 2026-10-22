import React, { ReactNode } from 'react';
import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { userReducer, userSlice } from '../utils/auth/userSlice';
import {
  editorImageModalReducer,
  editorImageModalSlice,
} from '../components/Editor/nodes/ImageModal/editorImageModalSlice';
import { imageModalReducer, imageModalSlice } from '../components/ImageModal/imageModalSlice';
import { globalReducer, globalSlice } from './globalSlice';
import { Provider } from 'react-redux';
import { locationAdapterSlice } from '../adapters/LocationAdapter';
import { userAdapterSlice } from '../adapters/UserAdapter';
import { moduleAdapterSlice } from '../adapters/ModuleAdapter';
import { worldAdapterSlice } from '../adapters/WorldAdapter';
import { systemAdapterSlice } from '../adapters/SystemAdapter';
import { characterAdapterSlice } from '../adapters/CharacterAdapter';
import { questAdapterSlice } from '../adapters/QuestAdapter';
import { entityAdapterSlice } from '../adapters/EntityAdapter';
import { imageAdapterSlice } from '../adapters/ImageAdapter';
import { postAdapterSlice } from '../adapters/PostAdapter';
import { mapAdapterSlice } from '../adapters/MapAdapter';
import { mappingReducer, mappingSlice } from '../adapters/mappingSlice';
import {
  menuCategoryReducer,
  menuCategorySlice,
} from '../screens/menus/MenuCategory/menuCategorySlice';

export const store = configureStore({
  reducer: {
    [mappingSlice.name]: mappingReducer,
    [menuCategorySlice.name]: menuCategoryReducer,

    [userSlice.name]: userReducer,
    [globalSlice.name]: globalReducer,
    [imageModalSlice.name]: imageModalReducer,
    [editorImageModalSlice.name]: editorImageModalReducer,

    //adapters:
    [userAdapterSlice.name]: userAdapterSlice.reducer,
    [moduleAdapterSlice.name]: moduleAdapterSlice.reducer,
    [worldAdapterSlice.name]: worldAdapterSlice.reducer,
    [systemAdapterSlice.name]: systemAdapterSlice.reducer,
    [characterAdapterSlice.name]: characterAdapterSlice.reducer,
    [questAdapterSlice.name]: questAdapterSlice.reducer,

    [entityAdapterSlice.name]: entityAdapterSlice.reducer,
    [imageAdapterSlice.name]: imageAdapterSlice.reducer,
    [postAdapterSlice.name]: postAdapterSlice.reducer,
    [mapAdapterSlice.name]: mapAdapterSlice.reducer,
    [locationAdapterSlice.name]: locationAdapterSlice.reducer,
  },
});

export type ReduxState = ReturnType<typeof store.getState>;

export type ReduxDispatch = typeof store.dispatch;
export type StoreAction<R> = ThunkAction<Promise<R>, ReduxState, unknown, AnyAction>;

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
