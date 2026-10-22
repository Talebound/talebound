import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMAGE_DEFAULT_HEADER, IMAGE_DEFAULT_MENU } from '../utils/images/imageDefaultUrls';
import { ModuleListLayoutMap } from './lib/ModuleListLayout/moduleLayoutLocalStore';
import { PbModuleType } from '../generated/api-types/data-contracts';
import { LayoutToggleGroupOption } from '../components/LayoutToggleGroup/layoutToggleGroupLib';

export interface GlobalSliceState {
  headerImage?: string;
  menuImage?: string;
  moduleListLayout: ModuleListLayoutMap;
}

const initialState: GlobalSliceState = {
  headerImage: IMAGE_DEFAULT_HEADER,
  menuImage: IMAGE_DEFAULT_MENU,
  moduleListLayout: {},
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
    setModuleListLayout: (
      state,
      action: PayloadAction<{
        moduleType: PbModuleType;
        value: LayoutToggleGroupOption;
      }>,
    ) => {
      const { moduleType, value } = action.payload;
      state.moduleListLayout[moduleType] = value;
    },
  },
});

export const { setHeaderImage, setMenuImage, setModuleListLayout } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
