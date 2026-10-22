import React, { useCallback } from 'react';
import { PbModuleAdmin } from '../../../../generated/api-types/data-contracts';
import Avatar from '../../../../components/Avatar/Avatar';
import { TitleH4 } from '../../../../components/Typography/Title';
import { Col, Row } from '../../../../components/Flex/Flex';
import { Text } from '../../../../components/Typography/Text';
import { TbShieldCheck, TbShieldOff, TbShieldQuestion } from 'react-icons/tb';
import { Button } from '../../../../components/Button/Button';
import Link from 'next/link';
import { formatDate } from '../../../../utils/functions/formatDate';
import { useUpdateModuleAdmin } from '../../../../api/modules/useUpdateModuleAdmin';
import ErrorText from '../../../../components/ErrorText/ErrorText';
import { useImage } from '../../../../hooks/useImage';

interface PropsByApprovedState {
  color: 'danger' | 'secondary';
  icon: React.ReactNode;
  text: string;
  showDenyButton?: boolean;
}

const propsByApprovedState: {
  denied: PropsByApprovedState;
  requested: PropsByApprovedState;
} = {
  denied: {
    color: 'danger',
    icon: <TbShieldOff size={30} />,
    text: 'Denied',
    showDenyButton: false,
  },
  requested: {
    color: 'secondary',
    icon: <TbShieldQuestion size={30} />,
    text: 'Requested',
    showDenyButton: true,
  },
};

interface CollaboratorRowRequestProps {
  data: PbModuleAdmin;
}

const CollaboratorRowRequest: React.FC<CollaboratorRowRequestProps> = ({ data }) => {
  const {
    mutate: updateModuleAdmin,
    isPending: isPendingUpdate,
    error: errorUpdate,
  } = useUpdateModuleAdmin();
  const { image: imageAvatar } = useImage(data?.user?.imgId ?? 0);

  const doRequest = useCallback(
    (approved: number) => {
      if (data.moduleId && data.userId) {
        updateModuleAdmin({
          moduleId: data.moduleId,
          body: {
            userId: data.userId,
            approved,
          },
        });
      }
    },
    [data.userId, data.moduleId, updateModuleAdmin],
  );

  const approveRequest = useCallback(() => {
    doRequest(1);
  }, [doRequest]);

  const denyRequest = useCallback(() => {
    doRequest(0);
  }, [doRequest]);

  const profileLink = `/user/${data.user?.id}/profile`;
  const props = propsByApprovedState[data.approved === 2 ? 'requested' : 'denied'];

  return (
    <Row gap="md" alignItems="start" wrap>
      <Link href={profileLink}>
        <Avatar type="user" url={imageAvatar?.url} />
      </Link>
      <Text color={props.color}>{props.icon}</Text>
      <Col css={{ width: '250px' }}>
        <Link href={profileLink}>
          <TitleH4 color={props.color}>{data.user?.username}</TitleH4>
        </Link>
        <Text i size="sm">
          {props.text}: {formatDate(data.createdAt, false, 'week')}
        </Text>
      </Col>
      <Col css={{ width: '250px' }}>
        <Text size="sm" i>
          {data.motivationalLetter ?? 'No motivational letter'}
        </Text>
      </Col>
      <Row gap="md">
        <Button size="sm" onClick={approveRequest} loading={isPendingUpdate}>
          <TbShieldCheck />
          Approve
        </Button>
        {props.showDenyButton && (
          <Button color="dangerOutline" size="sm" onClick={denyRequest} loading={isPendingUpdate}>
            <TbShieldOff />
            Deny
          </Button>
        )}
        <ErrorText error={errorUpdate} />
      </Row>
    </Row>
  );
};

export default CollaboratorRowRequest;
