import React, { Suspense } from 'react';
import Head from 'next/head';
import ModuleOpened from '../../../screens/modules/ModuleOpened';
import { useUrlModuleId } from '../../../hooks/useUrlModuleId';
import ModuleCollaborators from '../../../screens/modules/ModuleCollaborators/ModuleCollaborators';

const Systems: React.FC = () => {
  const moduleId = useUrlModuleId();

  return (
    <>
      <Head>
        <title>Collaborators</title>
      </Head>
      {moduleId && (
        <Suspense fallback={null}>
          <ModuleOpened moduleId={moduleId} />
          <ModuleCollaborators moduleId={moduleId} />
        </Suspense>
      )}
    </>
  );
};

export default Systems;
