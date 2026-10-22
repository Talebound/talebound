import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImagePosition, InlineImagePayload } from '../InlineImageNode/InlineImageNode';
import { ImageVariant } from '../../../../utils/images/imageUtils';

export interface EditorImageModalSliceState {
  inlineImagePayload: Omit<InlineImagePayload, 'caption'>;
  selectedVariant?: ImageVariant;
}

const initialState: EditorImageModalSliceState = {
  inlineImagePayload: {
    altText: '',
    src: '',
    position: ImagePosition.Left,
  },
  selectedVariant: undefined,
};

export const editorImageModalSlice = createSlice({
  name: 'editorImageModal',
  initialState,
  reducers: {
    resetInlineImagePayload: (state) => {
      state.inlineImagePayload = initialState.inlineImagePayload;
      state.selectedVariant = initialState.selectedVariant;
    },
    updateInlineImagePayload: (state, action: PayloadAction<Partial<InlineImagePayload>>) => {
      state.inlineImagePayload = {
        ...state.inlineImagePayload,
        ...action.payload,
      };
    },
    setInlineImagePayload: (state, action: PayloadAction<InlineImagePayload>) => {
      state.inlineImagePayload = action.payload;
    },
    setSelectedVariantInEditor: (state, action: PayloadAction<ImageVariant>) => {
      state.selectedVariant = action.payload;
    },
  },
});

export const {
  resetInlineImagePayload,
  updateInlineImagePayload,
  setInlineImagePayload,
  setSelectedVariantInEditor,
} = editorImageModalSlice.actions;

export const editorImageModalReducer = editorImageModalSlice.reducer;
