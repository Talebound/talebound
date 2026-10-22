import { PbImage } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { TaleboundError } from '../utils/types/error';
import { useGetImageById } from '../api/images/useGetImageById';
import { useSelector } from 'react-redux';
import { imageSelectors } from '../adapters/ImageAdapter';

interface UseImageResponse {
  image: PbImage | undefined;
  isFetching: boolean;
  error: TaleboundError | null;
}

export const useImage = (imageId: number | undefined): UseImageResponse => {
  const { isFetching, error } = useGetImageById({ variables: imageId });
  const image = useSelector((state) => imageSelectors.selectById(state, imageId ?? 0));

  return useMemo(
    () => ({
      image,
      isFetching,
      error,
    }),
    [image, isFetching, error],
  );
};
