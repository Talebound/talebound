import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMAGE_DEFAULT_HEADER, IMAGE_DEFAULT_MENU } from '../utils/images/imageDefaultUrls';

export interface GlobalSliceState {
  headerImage?: string;
  menuImage?: string;
}

const initialState: GlobalSliceState = {
  headerImage: IMAGE_DEFAULT_HEADER,
  menuImage: IMAGE_DEFAULT_MENU,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setHeaderImage: (state, action: PayloadAction<string | undefined>) => {
      state.headerImage = action.payload;
    },
    setMenuImage: (state, action: PayloadAction<string | undefined>) => {
      state.menuImage = action.payload;
    },
  },
});

export const { setHeaderImage, setMenuImage } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
