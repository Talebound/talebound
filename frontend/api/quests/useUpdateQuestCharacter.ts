import { invalidateQuestParticipation } from './invalidateQuestParticipation';
import { createMutation } from 'react-query-kit';
import { QuestsCollection } from '../collections';

type UpdateQuestCharacterParams = {
  questId: number;
  characterId: number;
  body: Parameters<typeof QuestsCollection.questsUpdateQuestCharacter>[2];
};

export const useUpdateQuestCharacter = createMutation({
  mutationFn: async (variables: UpdateQuestCharacterParams) =>
    QuestsCollection.questsUpdateQuestCharacter(
      variables.questId,
      variables.characterId,
      variables.body,
    ),
  onSuccess: invalidateQuestParticipation,
});
