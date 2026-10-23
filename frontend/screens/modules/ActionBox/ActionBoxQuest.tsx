import React, { useMemo } from 'react';
import ActionBox from '../../../components/ActionBox/ActionBox';
import Link from 'next/link';
import { Col, Row } from '../../../components/Flex/Flex';
import { TbMenuOrder, TbPencil } from 'react-icons/tb';
import { isModuleCollaborator, useMyModuleRole } from '../../../hooks/useModuleAdmins';
import { useGetModuleAdmins } from '../../../api/modules/useGetModuleAdmins';
import Loading from '../../../components/Loading/Loading';
import { useModule } from '../../../hooks/useModule';
import AvatarById from '../../../components/AvatarById/AvatarById';
import ActionBoxButton from './ActionBoxButton';
import { ActionBoxButtonType } from './actionBoxLib';

interface ActionBoxQuestProps {
  moduleId: number;
  activeButton?: ActionBoxButtonType;
}

const ActionBoxQuest: React.FC<ActionBoxQuestProps> = ({ moduleId, activeButton }) => {
  const { moduleTypeId, linkPrefix } = useModule(moduleId);
  const { role } = useMyModuleRole(moduleId);

  const { data: moduleAdmins = [], isPending } = useGetModuleAdmins({
    variables: moduleId,
  });

  const moduleAdminApproved = useMemo(
    () =>
      moduleAdmins
        .filter((wa) => wa.approved === 1)
        .sort((a, b) => (a.createdAt ?? '').localeCompare(b.createdAt ?? '')),
    [moduleAdmins],
  );
  return (
    <ActionBox
      key={`${linkPrefix}-${moduleTypeId}`}
      identifier={`action-box-module-edit_${activeButton}`}
    >
      <Col fullWidth css={{ height: '100%' }} gap="md" justifyContent="between">
        <Col gap="md">
          <Row gap="md">
            {isPending && <Loading size="sm" />}
            {moduleAdminApproved.map((moduleAdmin) => (
              <Link
                key={moduleAdmin.userId}
                href={`/user/${moduleAdmin.userId}/profile`}
                title={moduleAdmin.user?.username}
              >
                <AvatarById size="lg" type="user" imageId={moduleAdmin.user?.imgId} />
              </Link>
            ))}
          </Row>
        </Col>
        <Row gap="md" wrap={true} alignSelf="center">
          {isModuleCollaborator(role) && (
            <>
              <ActionBoxButton
                moduleTypeId={moduleTypeId}
                linkPrefix={linkPrefix}
                linkSuffix="edit"
                active={activeButton === 'edit'}
                icon={<TbPencil />}
                text="Edit"
              />
              <ActionBoxButton
                moduleTypeId={moduleTypeId}
                linkPrefix={linkPrefix}
                linkSuffix="edit/menu"
                active={activeButton === 'menu'}
                icon={<TbMenuOrder />}
                text="Menu administration"
              />
            </>
          )}
        </Row>
      </Col>
    </ActionBox>
  );
};

export default ActionBoxQuest;
