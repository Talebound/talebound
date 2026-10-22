import { PbViewModule, PbCharacter } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { useGetCharacterById } from '../api/characters/useGetCharacterById';
import { TaleboundError } from '../utils/types/error';
import { useModule } from './useModule';
import { useGetModuleId } from '../api/modules/useGetModuleId';
import { useSelector } from 'react-redux';
import { characterSelectors } from '../adapters/CharacterAdapter';

interface UseCharacterResponse {
  moduleId: number;
  module: PbViewModule | undefined;
  character: PbCharacter | undefined;
  isFetching: boolean;
  error: TaleboundError | null;
}

export const useCharacter = (characterId: number): UseCharacterResponse => {
  const { isFetching: isFetchingCharacter, error: errorCharacter } = useGetCharacterById({
    variables: characterId,
  });
  const character = useSelector((state) => characterSelectors.selectById(state, characterId));

  const { data: moduleId = 0 } = useGetModuleId({ variables: { characterId } });

  const { module, isFetching: isFetchingModule, error: errorModule } = useModule(moduleId);

  return useMemo(
    () => ({
      moduleId,
      module,
      character,
      isFetching: isFetchingCharacter ?? isFetchingModule,
      error: errorCharacter ?? errorModule,
    }),
    [
      errorModule,
      errorCharacter,
      isFetchingModule,
      isFetchingCharacter,
      module,
      moduleId,
      character,
    ],
  );
};
