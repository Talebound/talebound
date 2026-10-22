import { createSuspenseQuery } from 'react-query-kit';
import {
  PbEvaluationType,
  PbGetAverageUserEvaluationsByTypeResponse,
} from '../../generated/api-types/data-contracts';
import { UsersCollection } from '../collections';

export interface PbGetAverageUserEvaluationsByTypeRequest {
  userId: number;
  type: PbEvaluationType;
}

export const useGetAverageUserEvaluationByType = createSuspenseQuery<
  PbGetAverageUserEvaluationsByTypeResponse,
  PbGetAverageUserEvaluationsByTypeRequest
>({
  primaryKey: 'useGetAverageUserEvaluationByType',
  queryFn: async ({ queryKey: [, variables] }) => {
    const { data } = await UsersCollection.usersGetAverageUserEvaluationsByType(
      variables.userId,
      variables.type,
    );
    return data;
  },
});
