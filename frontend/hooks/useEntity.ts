import { PbViewEntity } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { useGetEntityById } from '../api/entities/useGetEntityById';
import { TaleboundError } from '../utils/types/error';
import { useAppSelector } from '../store/hooks';
import { entitySelectors } from '../adapters/EntityAdapter';

interface UseEntityResponse {
  entity: PbViewEntity | undefined;
  isFetching: boolean;
  error: TaleboundError | null;
}

export const useEntity = (entityId: number): UseEntityResponse => {
  const { isFetching, error } = useGetEntityById({ variables: entityId });
  const entity = useAppSelector((state) => entitySelectors.selectById(state, entityId));

  return useMemo(
    () => ({
      entity,
      isFetching: isFetching ?? false,
      error: error ?? null,
    }),
    [error, isFetching, entity],
  );
};
