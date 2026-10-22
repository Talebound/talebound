import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PbImage } from '../../generated/api-types/data-contracts';
import { ImageVariant } from '../../utils/images/imageUtils';

export interface EditorImageModalSliceState {
  selectedImage?: PbImage;
  selectedVariant?: ImageVariant;
}

const initialState: EditorImageModalSliceState = {
  selectedImage: undefined,
  selectedVariant: undefined,
};

export const imageModalSlice = createSlice({
  name: 'imageModal',
  initialState,
  reducers: {
    resetImageModalState: (state) => {
      state.selectedImage = initialState.selectedImage;
      state.selectedVariant = initialState.selectedVariant;
    },
    updateSelectedImage: (state, action: PayloadAction<Partial<PbImage>>) => {
      state.selectedImage = {
        ...state.selectedImage,
        ...action.payload,
      };
    },
    setSelectedImage: (state, action: PayloadAction<PbImage | undefined>) => {
      state.selectedImage = action.payload;
    },
    setSelectedVariant: (state, action: PayloadAction<ImageVariant | undefined>) => {
      state.selectedVariant = action.payload;
    },
  },
});

export const { resetImageModalState, updateSelectedImage, setSelectedImage, setSelectedVariant } =
  imageModalSlice.actions;

export const imageModalReducer = imageModalSlice.reducer;
