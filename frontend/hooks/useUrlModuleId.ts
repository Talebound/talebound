import useNumericParam from './useNumericParam';
import { useGetModuleId } from '../api/modules/useGetModuleId';
import { useMemo } from 'react';

export const useUrlModuleId = (): number => {
  const worldId = useNumericParam('worldId') ?? 0;
  const systemId = useNumericParam('systemId') ?? 0;
  const questId = useNumericParam('questId') ?? 0;
  const characterId = useNumericParam('characterId') ?? 0;

  const obj = useMemo(
    () => ({ variables: { worldId, systemId, questId, characterId } }),
    [worldId, systemId, questId, characterId],
  );

  const { data: moduleId } = useGetModuleId(obj);

  return moduleId ?? 0;
};
