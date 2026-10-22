import { UsersCollection } from '../collections';
import { createMutation } from 'react-query-kit';

export interface PbCreateOrUpdateEvaluationVoteRequest {
  /** @format int32 */
  userId: number;
  /** @format int32 */
  evaluationId: number;
  /** @format int32 */
  userIdVoter: number;
  /** @format int32 */
  value: number;
}

export const useCreateOrUpdateEvaluationVote = createMutation({
  mutationFn: async (variables: PbCreateOrUpdateEvaluationVoteRequest) =>
    UsersCollection.usersCreateOrUpdateEvaluationVote(variables.userId, variables),
});
