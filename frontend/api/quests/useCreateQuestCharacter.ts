import { invalidateQuestParticipation } from './invalidateQuestParticipation';
import { createMutation } from 'react-query-kit';
import { QuestsCollection } from '../collections';

export interface CreateQuestCharacterPayload {
  questId: number;
  characterId: number;
  data: Parameters<typeof QuestsCollection.questsCreateQuestCharacter>[2];
}

export const useCreateQuestCharacter = createMutation({
  mutationFn: async (variables: CreateQuestCharacterPayload) =>
    QuestsCollection.questsCreateQuestCharacter(
      variables.questId,
      variables.characterId,
      variables.data,
    ),
  onSuccess: invalidateQuestParticipation,
});
