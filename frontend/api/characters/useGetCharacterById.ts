import { createSuspenseQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbCharacter } from '../../generated/api-types/data-contracts';
import { CharactersCollection } from '../collections';
import { characterAdapterSlice, characterSelectors } from '../../adapters/CharacterAdapter';
import { store } from '../../store';

export const useGetCharacterById = createSuspenseQuery<PbCharacter, number, TaleboundError>({
  primaryKey: 'useGetCharacterById',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (variables === 0) return {};

    const character = characterSelectors.selectById(store.getState(), variables);

    if (!character) {
      const { data } = await CharactersCollection.charactersGetCharacterById(variables);
      store.dispatch(characterAdapterSlice.actions.upsertCharacter(data));
      return data;
    }

    return character;
  },
});
