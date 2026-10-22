import { createSuspenseQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbImage } from '../../generated/api-types/data-contracts';
import { ImagesCollection } from '../collections';
import { imageAdapterSlice, imageSelectors } from '../../adapters/ImageAdapter';
import { store } from '../../store';

export const useGetImageById = createSuspenseQuery<PbImage, number, TaleboundError>({
  primaryKey: 'useGetImageById',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (!variables) return {};
    const image = imageSelectors.selectById(store.getState(), variables);
    if (!image) {
      const { data } = await ImagesCollection.imagesGetImageById(variables);
      store.dispatch(imageAdapterSlice.actions.upsertImage(data));
      return data;
    }
    return image;
  },
});
