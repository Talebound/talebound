import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntityGroupContentHierarchy } from '../../../hooks/useGetMenuItemContentHierarchy';
import { PbEntityType } from '../../../generated/api-types/data-contracts';

export type NewEntityGroupData =
  | {
      type: 'CREATE_ENTITY_CONTENT';
      entityType: PbEntityType;
      entityIdOfType: number;
      targetEntityGroupId: number;
      targetPosition: number;
      //empty properties of MOVE_ENTITY_CONTENT
      contentId?: undefined;
      startEntityGroupId?: undefined;
      startPosition?: undefined;
    }
  | {
      type: 'MOVE_ENTITY_CONTENT';
      contentId: number;
      startEntityGroupId: number;
      startPosition: number;
      targetEntityGroupId: number;
      targetPosition: number;
      //empty properties of CREATE_ENTITY_CONTENT
      entityType?: undefined;
      entityIdOfType?: undefined;
    }
  | undefined;

export type NewEntityDraggingData = {
  type: 'NEW_ENTITY';
  entityType: PbEntityType;
  entityId: number;
  imageId?: number;
};

export type MenuCategoryDraggingData =
  | EntityGroupContentHierarchy
  | NewEntityDraggingData
  | undefined;

export interface MenuCategoryState {
  editMode: boolean;
  draggingData: MenuCategoryDraggingData;
  menuId: number;
  menuItemId: number;
  editEntityGroupId: number | undefined;
  newEntityGroupData: NewEntityGroupData;
  openedUrlPrefix: string;
}

const initialState: MenuCategoryState = {
  editMode: false,
  draggingData: undefined,
  menuId: 0,
  menuItemId: 0,
  editEntityGroupId: undefined,
  newEntityGroupData: undefined,
  openedUrlPrefix: '',
};

export const menuCategorySlice = createSlice({
  name: 'menuCategory',
  initialState,
  reducers: {
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload;
    },
    setDraggingData: (state, action: PayloadAction<MenuCategoryState['draggingData']>) => {
      state.draggingData = action.payload;
    },
    setMenuData: (state, action: PayloadAction<{ menuId: number; menuItemId: number }>) => {
      state.menuId = action.payload.menuId;
      state.menuItemId = action.payload.menuItemId;
    },
    setEditEntityGroupId: (state, action: PayloadAction<number | undefined>) => {
      state.editEntityGroupId = action.payload;
    },
    setNewEntityGroupData: (state, action: PayloadAction<NewEntityGroupData>) => {
      state.newEntityGroupData = action.payload;
    },
    setOpenedUrlPrefix: (state, action: PayloadAction<string>) => {
      state.openedUrlPrefix = action.payload;
    },
  },
});

export const {
  setEditMode,
  setDraggingData,
  setMenuData,
  setEditEntityGroupId,
  setNewEntityGroupData,
  setOpenedUrlPrefix,
} = menuCategorySlice.actions;

export const menuCategoryReducer = menuCategorySlice.reducer;
