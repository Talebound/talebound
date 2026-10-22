import { createMutation, inferData } from 'react-query-kit';
import { CharactersCollection } from '../collections';
import { useGetCharacterById } from './useGetCharacterById';
import { queryClient } from '../../pages/_app';
import { store } from '../../store';
import { characterAdapterSlice } from '../../adapters/CharacterAdapter';

type UpdateCharacterParams = {
  characterId: number;
  body: Parameters<typeof CharactersCollection.charactersUpdateCharacter>[1];
};

export const useUpdateCharacter = createMutation({
  mutationFn: async (variables: UpdateCharacterParams) =>
    CharactersCollection.charactersUpdateCharacter(variables.characterId, variables.body),
  onSuccess: (data) => {
    const characterId = data.data.id;
    if (characterId) {
      const characterQueryKey = useGetCharacterById.getKey(characterId);
      queryClient.setQueryData<inferData<typeof useGetCharacterById>>(characterQueryKey, () => {
        return data.data;
      });
      store.dispatch(characterAdapterSlice.actions.upsertCharacter(data.data));
    }
  },
});
