import { createQuery } from 'react-query-kit';
import { PbQuestCharacter } from '../../generated/api-types/data-contracts';
import { QuestsCollection } from '../collections';
import { TaleboundError } from '../../utils/types/error';

// Include the viewer in the key because application visibility is permission-dependent.
export const useGetQuestCharacters = createQuery<
  PbQuestCharacter[],
  { id: number; viewerId: number },
  TaleboundError
>({
  queryKey: ['useGetQuestCharacters'],
  fetcher: async (variables) => {
    if (!variables.id) return [];
    const { data } = await QuestsCollection.questsGetQuestCharacters(variables.id);
    return data?.questCharacters ?? [];
  },
});
