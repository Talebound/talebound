import { queryClient } from '../../pages/_app';
import { useGetCharacterQuests } from '../characters/useGetCharacterQuests';
import { useGetQuestCharacters } from './useGetQuestCharacters';

export const invalidateQuestParticipation = () =>
  Promise.all([
    queryClient.invalidateQueries({ queryKey: useGetQuestCharacters.getKey() }),
    queryClient.invalidateQueries({ queryKey: useGetCharacterQuests.getKey() }),
  ]);
