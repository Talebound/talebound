import { PbViewModule, PbSystem } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { useGetSystemById } from '../api/systems/useGetSystemById';
import { TaleboundError } from '../utils/types/error';
import { useModule } from './useModule';
import { useGetModuleId } from '../api/modules/useGetModuleId';
import { useSelector } from 'react-redux';
import { systemSelectors } from '../adapters/SystemAdapter';

interface UseSystemResponse {
  moduleId: number;
  module: PbViewModule | undefined;
  system: PbSystem | undefined;
  isFetching: boolean;
  error: TaleboundError | null;
}

export const useSystem = (systemId: number): UseSystemResponse => {
  const { isFetching: isFetchingSystem, error: errorSystem } = useGetSystemById({
    variables: systemId,
  });
  const system = useSelector((state) => systemSelectors.selectById(state, systemId));

  const { data: moduleId = 0 } = useGetModuleId({ variables: { systemId } });

  const { module, isFetching: isFetchingModule, error: errorModule } = useModule(moduleId);

  return useMemo(
    () => ({
      moduleId,
      module,
      system,
      isFetching: isFetchingSystem ?? isFetchingModule,
      error: errorSystem ?? errorModule,
    }),
    [errorModule, errorSystem, isFetchingModule, isFetchingSystem, module, moduleId, system],
  );
};
