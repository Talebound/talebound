import { PbLocation } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { TaleboundError } from '../utils/types/error';
import { useGetLocationById } from '../api/locations/useGetLocationById';
import { useSelector } from 'react-redux';
import { locationSelectors } from '../adapters/LocationAdapter';

interface UseLocationResponse {
  location: PbLocation | undefined;
  isFetching: boolean;
  error: TaleboundError | null;
}

export const useLocation = (locationId: number | undefined): UseLocationResponse => {
  const { isFetching, error } = useGetLocationById({ variables: locationId });
  const location = useSelector((state) => locationSelectors.selectById(state, locationId ?? 0));

  return useMemo(
    () => ({
      location,
      isFetching,
      error,
    }),
    [location, isFetching, error],
  );
};
