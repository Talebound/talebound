import React, { Suspense } from 'react';
import Head from 'next/head';
import ModuleOpened from '../../../../screens/modules/ModuleOpened';
import { useUrlModuleId } from '../../../../hooks/useUrlModuleId';
import EditModuleMenu from '../../../../screens/modules/EditModuleMenu/EditModuleMenu';

const Systems: React.FC = () => {
  const moduleId = useUrlModuleId();

  return (
    <>
      <Head>
        <title>Systems - menu administration</title>
      </Head>
      {moduleId && (
        <Suspense fallback={null}>
          <ModuleOpened moduleId={moduleId} />
          <EditModuleMenu moduleId={moduleId} />
        </Suspense>
      )}
    </>
  );
};

export default Systems;
