import { PbViewModule, PbWorld } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { useGetWorldById } from '../api/worlds/useGetWorldById';
import { TaleboundError } from '../utils/types/error';
import { useModule } from './useModule';
import { useGetModuleId } from '../api/modules/useGetModuleId';
import { useSelector } from 'react-redux';
import { worldSelectors } from '../adapters/WorldAdapter';

interface UseWorldResponse {
  moduleId: number;
  module: PbViewModule | undefined;
  world: PbWorld | undefined;
  isFetching: boolean;
  error: TaleboundError | null;
}

export const useWorld = (worldId: number): UseWorldResponse => {
  const { isFetching: isFetchingWorld, error: errorWorld } = useGetWorldById({
    variables: worldId,
  });
  const world = useSelector((state) => worldSelectors.selectById(state, worldId));

  const { data: moduleId = 0 } = useGetModuleId({ variables: { worldId } });

  const { module, isFetching: isFetchingModule, error: errorModule } = useModule(moduleId);

  return useMemo(
    () => ({
      moduleId,
      module,
      world,
      isFetching: isFetchingWorld ?? isFetchingModule,
      error: errorWorld ?? errorModule,
    }),
    [errorModule, errorWorld, isFetchingModule, isFetchingWorld, module, moduleId, world],
  );
};
