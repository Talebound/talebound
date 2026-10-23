import React, { useMemo } from 'react';
import ActionBox from '../../../components/ActionBox/ActionBox';
import Link from 'next/link';
import { Col, Row } from '../../../components/Flex/Flex';
import { TbMenuOrder, TbPencil, TbUsersGroup } from 'react-icons/tb';
import {
  isModuleCollaborator,
  useMyModuleRole,
  ModuleAdminRole,
} from '../../../hooks/useModuleAdmins';
import { TitleH4 } from '../../../components/Typography/Title';
import { useGetModuleAdmins } from '../../../api/modules/useGetModuleAdmins';
import Loading from '../../../components/Loading/Loading';
import { Text } from '../../../components/Typography/Text';
import { Badge } from 'antd';
import { theme } from '../../../styles/stitches.config';
import { useModule } from '../../../hooks/useModule';
import AvatarById from '../../../components/AvatarById/AvatarById';
import ActionBoxButton from './ActionBoxButton';
import { ActionBoxButtonType } from './actionBoxLib';

interface ActionBoxCollaboratorsProps {
  moduleId: number;
  activeButton?: ActionBoxButtonType;
}

const ActionBoxCollaborators: React.FC<ActionBoxCollaboratorsProps> = ({
  moduleId,
  activeButton,
}) => {
  const { moduleTypeId, linkPrefix } = useModule(moduleId);
  const { role, roleWithoutAdmin } = useMyModuleRole(moduleId);

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

  const moduleAdminRequests = useMemo(
    () => moduleAdmins.filter((wa) => wa.approved === 2),
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
            <TitleH4>Collaborators</TitleH4>
            <Link href={`/${linkPrefix}/${moduleTypeId}/collaborators`}>
              {roleWithoutAdmin === ModuleAdminRole.REQUESTED && (
                <Text i u>
                  (collaboration requested)
                </Text>
              )}
              {roleWithoutAdmin === ModuleAdminRole.DENIED && (
                <Text i u>
                  (collaboration denied)
                </Text>
              )}
              {roleWithoutAdmin === ModuleAdminRole.NONE && (
                <Text i u>
                  (want to collaborate?)
                </Text>
              )}
            </Link>
          </Row>
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
            <ActionBoxButton
              moduleTypeId={moduleTypeId}
              linkPrefix={linkPrefix}
              linkSuffix="edit"
              active={activeButton === 'edit'}
              icon={<TbPencil />}
              text="Edit"
            />
          )}
          <Badge
            color={theme.colors.primary.toString()}
            size="medium"
            count={moduleAdminRequests.length}
            title={`${moduleAdminRequests.length} request${
              moduleAdminRequests.length > 1 ? 's' : ''
            }`}
          >
            <ActionBoxButton
              moduleTypeId={moduleTypeId}
              linkPrefix={linkPrefix}
              linkSuffix="collaborators"
              active={activeButton === 'collaborators'}
              icon={<TbUsersGroup />}
              text="Collaborators"
            />
          </Badge>
          {isModuleCollaborator(role) && (
            <ActionBoxButton
              moduleTypeId={moduleTypeId}
              linkPrefix={linkPrefix}
              linkSuffix="edit/menu"
              active={activeButton === 'menu'}
              icon={<TbMenuOrder />}
              text="Menu administration"
            />
          )}
        </Row>
      </Col>
    </ActionBox>
  );
};

export default ActionBoxCollaborators;
