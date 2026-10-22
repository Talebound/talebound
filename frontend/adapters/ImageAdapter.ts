import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { PbImage } from '../generated/api-types/data-contracts';
import { ReduxState } from '../store';
import { createSelector } from 'reselect';

export const ImageAdapter = createEntityAdapter<PbImage>({
  selectId: (image) => image.id!,
  sortComparer: (a, b) => a.id! - b.id!,
});

export const imageAdapterSlice = createSlice({
  name: 'images',
  initialState: ImageAdapter.getInitialState(),
  reducers: {
    addImages: ImageAdapter.addMany,
    addImage: ImageAdapter.addOne,
    removeImage: ImageAdapter.removeOne,
    updateImage: ImageAdapter.updateOne,
    upsertImage: ImageAdapter.upsertOne,
    upsertImages: ImageAdapter.upsertMany,
    removeImages: ImageAdapter.removeMany,
    removeAllImages: ImageAdapter.removeAll,
  },
});

export const imageSelectors = ImageAdapter.getSelectors<ReduxState>(
  (state) => state[imageAdapterSlice.name],
);

export const selectImagesByIds = createSelector(
  [imageSelectors.selectEntities, (_, ids: number[]) => ids],
  (entities, ids) => ids.map((id) => entities[id]).filter(Boolean),
);

// And then use the selectors to retrieve values
// const _allImages = imageSelectors.selectAll(store.getState());

// const images = useSelector((state) => selectImagesByIds(state, imageIds));
