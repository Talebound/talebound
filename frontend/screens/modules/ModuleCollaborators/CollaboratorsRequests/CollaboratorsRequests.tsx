import React, { useCallback, useMemo, useState } from 'react';
import { useGetModuleAdmins } from '../../../../api/modules/useGetModuleAdmins';
import ContentSection from '../../../../components/ContentSection/ContentSection';
import CollaboratorRowRequest from './CollaboratorRowRequest';
import { useMyModuleRole, ModuleAdminRole } from '../../../../hooks/useModuleAdmins';
import { Row } from '../../../../components/Flex/Flex';
import { Button } from '../../../../components/Button/Button';

interface CollaboratorsRequestsProps {
  moduleId: number;
}

const CollaboratorsRequests: React.FC<CollaboratorsRequestsProps> = ({ moduleId }) => {
  const role = useMyModuleRole(moduleId);
  const { data: moduleAdmins = [], isPending } = useGetModuleAdmins({
    variables: moduleId,
  });

  const [showDenied, setShowDenied] = useState(false);

  const moduleAdminRequestsWaiting = useMemo(
    () => moduleAdmins.filter((wa) => wa.approved === 2),
    [moduleAdmins],
  );

  const moduleAdminRequestsDenied = useMemo(
    () => moduleAdmins.filter((wa) => wa.approved === 0 || !wa.approved),
    [moduleAdmins],
  );

  const toggleShowDenied = useCallback(() => {
    setShowDenied((p) => !p);
  }, []);

  if (role !== ModuleAdminRole.SUPER_COLLABORATOR) {
    return null;
  }

  return (
    <ContentSection loading={isPending} flexWrap="wrap" direction="column" header="Requests">
      {moduleAdminRequestsWaiting.length === 0 && <p>No pending collaboration requests</p>}
      {moduleAdminRequestsWaiting.map((wa) => (
        <CollaboratorRowRequest data={wa} key={wa.userId} />
      ))}
      {showDenied &&
        moduleAdminRequestsDenied.map((wa) => <CollaboratorRowRequest data={wa} key={wa.userId} />)}
      {moduleAdminRequestsDenied.length > 0 && (
        <Row alignSelf="end">
          <Button color="primaryOutline" size="sm" onClick={toggleShowDenied}>
            {showDenied ? 'Hide' : 'Show'} already denied requests
          </Button>
        </Row>
      )}
    </ContentSection>
  );
};

export default CollaboratorsRequests;
