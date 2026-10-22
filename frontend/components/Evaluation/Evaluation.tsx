import React, { useCallback } from 'react';
import Rating from '../Rating/Rating';
import { Col, Row } from '../Flex/Flex';
import { PbAverageEvaluationVote } from '../../generated/api-types/data-contracts';
import { useAuth } from '../../hooks/useAuth';
import { useCreateOrUpdateEvaluationVote } from '../../api/users/useCreateOrUpdateEvaluationVote';
import { styled } from '../../styles/stitches.config';

const EvaluationWrapper = styled(Col, {
  padding: '$md',
  width: '100%',
  gap: '$sm',
  borderRadius: '$md',
  background: '$white700',

  variants: {
    compact: {
      true: {
        padding: '$xs',
        gap: '$xs',
        borderRadius: '0',
        background: 'transparent',
      },
    },
  },
});

const EvaluationRow = styled(Row, {
  gap: '1rem',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const EvaluationTitle = styled('p', {
  color: '$primary600',
  fontFamily: '$heading',
  fontSize: '$md',
  textTransform: 'uppercase',
});

interface EvaluationProps {
  data: PbAverageEvaluationVote;
  disabled?: boolean;
  compact?: boolean;
}

const Evaluation: React.FC<EvaluationProps> = ({ data, disabled, compact = false }) => {
  const { user } = useAuth();

  const doVote = useCreateOrUpdateEvaluationVote();

  const handleChange = useCallback(
    (value: number) => {
      if (disabled) return;
      if (!data.userId) return;
      if (!user?.id) return;
      if (!data.evaluationId) return;

      doVote.mutate({
        userId: data.userId,
        userIdVoter: user.id,
        evaluationId: data.evaluationId,
        value,
      });
    },
    [disabled, data.userId, data.evaluationId, doVote, user?.id],
  );

  return (
    <EvaluationWrapper compact={compact}>
      <EvaluationRow>
        <EvaluationTitle>{data.name}</EvaluationTitle>
        <Rating onChange={handleChange} defaultValue={data.average} disabled={disabled} />
      </EvaluationRow>
      {!compact && <span>{data.description}</span>}
    </EvaluationWrapper>
  );
};

export default Evaluation;
