import { createMutation } from 'react-query-kit';
import { ImagesCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetImages } from './useGetImages';
import { PbUploadImageRequest } from '../../generated/api-types/data-contracts';
import { store } from '../../store';
import { imageAdapterSlice } from '../../adapters/ImageAdapter';

export interface ExpandedUploadImageRequest extends PbUploadImageRequest {
  userId?: number;
}

export const useUploadImage = createMutation({
  mutationFn: async (variables: ExpandedUploadImageRequest) =>
    ImagesCollection.imagesUploadDefaultImage(variables),

  onSuccess: (data) => {
    store.dispatch(imageAdapterSlice.actions.upsertImage(data.data));
    // Refetch filtered pages so their membership, counts, and offsets stay consistent.
    return queryClient.invalidateQueries({ queryKey: useGetImages.getKey() });
  },
});
