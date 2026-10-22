import { createMutation } from 'react-query-kit';
import { PbCreateCharacterRequest } from '../../generated/api-types/data-contracts';
import { CharactersCollection } from '../collections';
import router from 'next/router';
import { store } from '../../store';
import { characterAdapterSlice } from '../../adapters/CharacterAdapter';
import { moduleAdapterSlice } from '../../adapters/ModuleAdapter';
import { mappingSlice } from '../../adapters/mappingSlice';

export const useCreateCharacter = createMutation({
  mutationFn: async (variables: PbCreateCharacterRequest) =>
    CharactersCollection.charactersCreateCharacter(variables),
  onSuccess: (data) => {
    if (data.data?.character) {
      store.dispatch(characterAdapterSlice.actions.upsertCharacter(data.data?.character));
    }
    if (data.data?.module) {
      store.dispatch(moduleAdapterSlice.actions.upsertModule(data.data?.module));
      store.dispatch(mappingSlice.actions.mapModules([data.data?.module]));
    }
    const characterId = data.data.character?.id;
    if (characterId) {
      router.push(`/characters/${characterId}/edit`).catch((error) => console.error(error));
    }
  },
});
