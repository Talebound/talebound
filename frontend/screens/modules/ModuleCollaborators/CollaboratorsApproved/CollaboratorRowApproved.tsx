import React, { useCallback, useMemo } from 'react';
import { PbModuleAdmin } from '../../../../generated/api-types/data-contracts';
import Avatar from '../../../../components/Avatar/Avatar';
import { TitleH4 } from '../../../../components/Typography/Title';
import { Col, Row } from '../../../../components/Flex/Flex';
import { Text } from '../../../../components/Typography/Text';
import { TbShield, TbShieldOff, TbShieldStar } from 'react-icons/tb';
import { Button } from '../../../../components/Button/Button';
import Link from 'next/link';
import { formatDate } from '../../../../utils/functions/formatDate';
import { useMyModuleRole, ModuleAdminRole } from '../../../../hooks/useModuleAdmins';
import { useUpdateModuleAdmin } from '../../../../api/modules/useUpdateModuleAdmin';
import { useDeleteModuleAdmin } from '../../../../api/modules/useDeleteModuleAdmin';
import AlertDialog from '../../../../components/AlertDialog/AlertDialog';
import ErrorText from '../../../../components/ErrorText/ErrorText';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../../store';
import { useImage } from '../../../../hooks/useImage';
import { useModule } from '../../../../hooks/useModule';
import { entitiesOfModules, entityTypeTitle } from '../../../../utils/modulesAndEntities';
import CollaboratorPrivilegeCheckbox from './CollaboratorPrivilegeCheckbox';

interface CollaboratorRowApprovedProps {
  data: PbModuleAdmin;
  canLeave?: boolean;
}

//Make super - gold button color? css={{ backgroundColor: '$warning' }}

const CollaboratorRowApproved: React.FC<CollaboratorRowApprovedProps> = ({
  data,
  canLeave = true,
}) => {
  const moduleId = data.moduleId ?? 0;
  const { module } = useModule(moduleId);
  const role = useMyModuleRole(moduleId);
  const userId = useSelector((state: ReduxState) => state.auth.user?.id);
  const isMyRow = data.user?.id === userId;
  const profileLink = `/user/${data.user?.id}/profile`;
  const { image: imageAvatar } = useImage(data?.user?.imgId ?? 0);

  const {
    mutate: updateModuleAdmin,
    isPending: isPendingUpdate,
    error: errorUpdate,
  } = useUpdateModuleAdmin();

  const {
    mutate: deleteModuleAdmin,
    isPending: isPendingDelete,
    error: errorDelete,
  } = useDeleteModuleAdmin();

  const doRequest = useCallback(
    (superAdmin: boolean) => {
      if (data.moduleId && data.userId && module?.moduleType) {
        updateModuleAdmin({
          moduleId: data.moduleId,
          body: {
            userId: data.userId,
            superAdmin,
            allowedEntityTypes: {
              entityTypes: superAdmin
                ? entitiesOfModules[module.moduleType]
                : data.allowedEntityTypes,
            },
          },
        });
      }
    },
    [data.moduleId, data.userId, data.allowedEntityTypes, module?.moduleType, updateModuleAdmin],
  );

  const makeSuperCollaborator = useCallback(() => doRequest(true), [doRequest]);
  const makeBasicCollaborator = useCallback(() => doRequest(false), [doRequest]);

  const deleteSuperCollaborator = useCallback(() => {
    if (data.moduleId && data.userId) {
      deleteModuleAdmin({
        moduleId: data.moduleId,
        userId: data.userId,
      });
    }
  }, [data.userId, data.moduleId, deleteModuleAdmin]);

  const deleteButton = useMemo(
    () => (
      <Button color="dangerOutline" size="sm" loading={isPendingDelete}>
        <TbShieldOff />
        Remove from collaborators
      </Button>
    ),
    [isPendingDelete],
  );

  const leaveButton = useMemo(
    () => (
      <Button color="dangerOutline" size="sm" loading={isPendingDelete}>
        <TbShieldOff />
        Leave
      </Button>
    ),
    [isPendingDelete],
  );

  return (
    <Row gap="md" justifyContent="start" alignItems="start">
      <Row gap="md" alignItems="start">
        <Link href={profileLink}>
          <Avatar type="user" url={imageAvatar?.url} />
        </Link>
        <Text color={data.superAdmin ? 'warning' : 'primary'}>
          {data.superAdmin ? <TbShieldStar size={30} /> : <TbShield size={30} />}
        </Text>
        <Col css={{ width: '250px' }}>
          <Link href={profileLink}>
            <TitleH4 color={data.superAdmin ? 'warning' : undefined}>{data.user?.username}</TitleH4>
          </Link>
          <Text i size="sm">
            from: {formatDate(data.createdAt, false, 'week')}
          </Text>
        </Col>
      </Row>
      <Col gap="md">
        <Row gap="md">
          {role === ModuleAdminRole.SUPER_COLLABORATOR && !isMyRow && (
            <>
              {data.superAdmin ? (
                <Button size="sm" onClick={makeBasicCollaborator} loading={isPendingUpdate}>
                  <TbShield />
                  Make basic
                </Button>
              ) : (
                <Button size="sm" onClick={makeSuperCollaborator} loading={isPendingUpdate}>
                  <TbShieldStar />
                  Make super
                </Button>
              )}
              <AlertDialog
                triggerElement={deleteButton}
                title={`Remove "${data.user?.username}" from collaborators?`}
                description="User will no longer be able to edit this module, but can send request for collaboration again."
                dangerButtonText="Remove collaborator"
                submitAction={deleteSuperCollaborator}
              />
            </>
          )}
          {(canLeave || role !== ModuleAdminRole.SUPER_COLLABORATOR) && isMyRow && (
            <AlertDialog
              triggerElement={leaveButton}
              title={`Leave module`}
              description="You will no longer be able to edit this module. You can send request to be collaborator again."
              dangerButtonText="Leave"
              submitAction={deleteSuperCollaborator}
            />
          )}
          <ErrorText error={errorUpdate ?? errorDelete} />
        </Row>
        {module?.moduleType && (
          <Row gap="md">
            <Text b>Privileges: </Text>
            {data.superAdmin
              ? 'All'
              : entitiesOfModules[module.moduleType].map((e) => (
                  <Row gap="sm" key={e}>
                    <CollaboratorPrivilegeCheckbox
                      disabled={role !== ModuleAdminRole.SUPER_COLLABORATOR}
                      entityType={e}
                      data={data}
                    />
                    {entityTypeTitle(e, true)}
                  </Row>
                ))}
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default CollaboratorRowApproved;
