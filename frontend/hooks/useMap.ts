import { PbMap } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { TaleboundError } from '../utils/types/error';
import { useGetMapById } from '../api/maps/useGetMapById';
import { useSelector } from 'react-redux';
import { mapSelectors } from '../adapters/MapAdapter';

interface UseMapResponse {
  map: PbMap | undefined;
  isFetching: boolean;
  error: TaleboundError | null;
}

export const useMap = (mapId: number | undefined): UseMapResponse => {
  const { isFetching, error } = useGetMapById({ variables: mapId });
  const map = useSelector((state) => mapSelectors.selectById(state, mapId ?? 0));

  return useMemo(
    () => ({
      map,
      isFetching,
      error,
    }),
    [map, isFetching, error],
  );
};
