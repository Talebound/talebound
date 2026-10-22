import React, { Suspense } from 'react';
import { Col } from '../../../components/Flex/Flex';
import { isModuleCollaborator, useMyModuleRole } from '../../../hooks/useModuleAdmins';
import Post from '../../../component-sections/Post/Post';
import LoadingText from '../../../components/Loading/LoadingText';
import { useModule } from '../../../hooks/useModule';

type ModuleIntroductionProps = {
  moduleId: number;
  postViewOnly?: boolean;
};

const ModuleIntroduction: React.FC<ModuleIntroductionProps> = ({
  moduleId,
  postViewOnly = false,
}) => {
  const { module } = useModule(moduleId);
  const role = useMyModuleRole(moduleId);
  const hasRightToEdit = isModuleCollaborator(role);

  return (
    <Col fullWidth>
      <Suspense fallback={<LoadingText />}>
        {module?.descriptionPostId && (
          <Post
            key={module.descriptionPostId}
            postId={module.descriptionPostId}
            canEdit={!postViewOnly && hasRightToEdit}
            showTitle={false}
            transparent={true}
          />
        )}
      </Suspense>
    </Col>
  );
};

export default ModuleIntroduction;
