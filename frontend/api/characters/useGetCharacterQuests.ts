import { createQuery } from 'react-query-kit';
import { PbQuestCharacter } from '../../generated/api-types/data-contracts';
import { CharactersCollection } from '../collections';
import { TaleboundError } from '../../utils/types/error';

// Include the viewer in the key because application visibility is permission-dependent.
export const useGetCharacterQuests = createQuery<
  PbQuestCharacter[],
  { id: number; viewerId: number },
  TaleboundError
>({
  queryKey: ['useGetCharacterQuests'],
  fetcher: async (variables) => {
    if (!variables.id) return [];
    const { data } = await CharactersCollection.charactersGetCharacterQuests(variables.id);
    return data?.questCharacters ?? [];
  },
});
