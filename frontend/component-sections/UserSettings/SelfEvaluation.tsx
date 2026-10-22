import React from 'react';
import ContentSection from '../../components/ContentSection/ContentSection';
import Evaluation from '../../components/Evaluation/Evaluation';
import { useGetAverageUserEvaluationByType } from '../../api/users/useGetAverageUserEvaluationByType';
import { useAuth } from '../../hooks/useAuth';
import { PbEvaluationType } from '../../generated/api-types/data-contracts';
import { Flex } from '../../components/Flex/Flex';
import Loading from '../../components/Loading/Loading';
import { Text } from '../../components/Typography/Text';

const SelfEvaluation: React.FC = () => {
  const { user } = useAuth();

  const {
    data,
    isPending,
    error: _error,
  } = useGetAverageUserEvaluationByType({
    variables: {
      userId: user?.id ?? 0,
      type: PbEvaluationType.Self,
    },
  });

  return (
    <ContentSection header="Your experience" direction="column">
      <Text>
        Knowing more about your strengths, experience, and areas of interest can help us facilitate
        better connections and gameplay experiences. Take a moment to reflect and rate your own
        expertise in the following areas:
      </Text>
      {isPending && (
        <Flex alignSelf="center">
          <Loading color="secondary" /> Loading...
        </Flex>
      )}
      {data?.averageEvaluationVote?.map((evaluation) => (
        <Evaluation key={evaluation.evaluationId} data={evaluation} />
      ))}
    </ContentSection>
  );
};

export default SelfEvaluation;
