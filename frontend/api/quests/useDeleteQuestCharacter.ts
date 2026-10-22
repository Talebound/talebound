import { invalidateQuestParticipation } from './invalidateQuestParticipation';
import { createMutation } from 'react-query-kit';
import { QuestsCollection } from '../collections';

interface DeleteQuestCharacterParams {
  questId: number;
  characterId: number;
}

export const useDeleteQuestCharacter = createMutation({
  mutationFn: async (variables: DeleteQuestCharacterParams) =>
    QuestsCollection.questsDeleteQuestCharacter(variables.questId, variables.characterId),
  onSuccess: invalidateQuestParticipation,
});
