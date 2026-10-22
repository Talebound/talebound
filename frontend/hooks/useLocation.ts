import { PbLocation } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { TaleboundError } from '../utils/types/error';
import { useGetLocationById } from '../api/locations/useGetLocationById';
import { useAppSelector } from '../store/hooks';
import { locationSelectors } from '../adapters/LocationAdapter';

interface UseLocationResponse {
  location: PbLocation | undefined;
  isFetching: boolean;
  error: TaleboundError | null;
}

export const useLocation = (locationId: number | undefined): UseLocationResponse => {
  const { isFetching, error } = useGetLocationById({ variables: locationId });
  const location = useAppSelector((state) => locationSelectors.selectById(state, locationId ?? 0));

  return useMemo(
    () => ({
      location,
      isFetching,
      error,
    }),
    [location, isFetching, error],
  );
};
