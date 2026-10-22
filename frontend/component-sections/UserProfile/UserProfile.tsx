import React, { Suspense } from 'react';
import { useGetUserById } from '../../api/users/useGetUserById';
import ContentSection from '../../components/ContentSection/ContentSection';
import { Col, Row } from '../../components/Flex/Flex';
import { TitleH2 } from '../../components/Typography/Title';
import { formatDate } from '../../utils/functions/formatDate';
import InfoRow from '../../components/InfoRow/InfoRow';
import InfoRowBox from '../../components/InfoRow/InfoRowBox';
import { Button } from '../../components/Button/Button';
import { useGetAverageUserEvaluationByType } from '../../api/users/useGetAverageUserEvaluationByType';
import { PbEvaluationType } from '../../generated/api-types/data-contracts';
import Evaluation from '../../components/Evaluation/Evaluation';
import Avatar from '../../components/Avatar/Avatar';
import Loading from '../../components/Loading/Loading';

export interface UserProfileProps {
  userId: number;
}

const UserIntroduction = React.lazy(() => import('./UserIntroduction'));

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const {
    data,
    isPending: _isPending,
    error: _error,
  } = useGetUserById({
    variables: userId,
  });

  const { data: evaluationData } = useGetAverageUserEvaluationByType({
    variables: {
      userId: userId,
      type: PbEvaluationType.Self,
    },
  });

  return (
    <>
      <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
        <ContentSection direction="row" flexBasis="100%">
          <Col gap="sm">
            <Avatar type="user" size="2xl" url={data?.avatarImageUrl} />
            <Button fullWidth color="primaryOutline">
              Edit
            </Button>
            <Button fullWidth color="primaryOutline">
              Message
            </Button>
            <Button fullWidth color="primaryOutline">
              Ban
            </Button>
          </Col>
          <Col fullWidth gap="sm">
            <TitleH2>{data?.username}</TitleH2>
            <Row gap="md" fullWidth justifyContent="between" wrap>
              <Col gap="sm" css={{ flexBasis: '200px', minWidth: '200px' }}>
                <InfoRowBox>
                  <InfoRow title="Last active:" value="unknown" />
                  <InfoRow title="Registered:" value={formatDate(data?.createdAt, false, 'week')} />
                </InfoRowBox>
              </Col>
              <Col css={{ flexBasis: '420px', minWidth: '420px' }}>
                {(evaluationData?.averageEvaluationVote ?? []).map((evaluation) => (
                  <Evaluation key={evaluation.evaluationId} data={evaluation} disabled compact />
                ))}
              </Col>
            </Row>
          </Col>
        </ContentSection>
      </Col>
      <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
        <ContentSection direction="column" header="Introduction">
          <Suspense fallback={<Loading />}>
            <UserIntroduction key={userId} userId={userId} postViewOnly={false} />
          </Suspense>
        </ContentSection>
      </Col>
    </>
  );
};

export default UserProfile;
