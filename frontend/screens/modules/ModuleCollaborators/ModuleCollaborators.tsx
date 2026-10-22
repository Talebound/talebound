import React, { Suspense, useMemo } from 'react';
import ActionBoxModule from '../ActionBox/ActionBoxModule';
import Layout from '../../../components/Layout/Layout';
import { Col, Row } from '../../../components/Flex/Flex';
import CollaboratorsApproved from './CollaboratorsApproved/CollaboratorsApproved';
import NewCollaboratorRequest from './NewCollaboratorRequest/NewCollaboratorRequest';
import ArticleWorldCollaboration from '../../../articles/Worlds/ArticleWorldCollaboration';
import CollaboratorsRequests from './CollaboratorsRequests/CollaboratorsRequests';
import LeftNavbarModule from '../../../components/LeftNavbar/LeftNavbarModule';
import { useModule } from '../../../hooks/useModule';
import { PbModuleType } from '../../../generated/api-types/data-contracts';

interface ModuleCollaboratorsProps {
  moduleId: number;
}

const ModuleCollaborators: React.FC<ModuleCollaboratorsProps> = ({ moduleId }) => {
  const { module } = useModule(moduleId);
  const navbar = useMemo(
    () => (
      <Suspense fallback={null}>
        <LeftNavbarModule moduleId={moduleId} />
      </Suspense>
    ),
    [moduleId],
  );

  return (
    <>
      <Suspense fallback={null}>
        <ActionBoxModule moduleId={moduleId} activeButton="collaborators" />
      </Suspense>
      <Layout vertical={true} navbar={navbar}>
        <Row gap="md" alignItems="start" wrap>
          <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
            <CollaboratorsRequests moduleId={moduleId} />
            <CollaboratorsApproved moduleId={moduleId} />
            <NewCollaboratorRequest moduleId={moduleId} />
          </Col>
          <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
            {module?.moduleType === PbModuleType.MODULE_TYPE_WORLD && <ArticleWorldCollaboration />}
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default ModuleCollaborators;
