import React, { Suspense } from 'react';
import Head from 'next/head';
import EditSystem from '../../../../screens/systems/EditSystem/EditSystem';
import useNumericParam from '../../../../hooks/useNumericParam';
import ModuleOpened from '../../../../screens/modules/ModuleOpened';
import { useUrlModuleId } from '../../../../hooks/useUrlModuleId';

const Systems: React.FC = () => {
  const moduleId = useUrlModuleId();
  const systemId = useNumericParam('systemId');

  return (
    <>
      <Head>
        <title>Systems</title>
      </Head>
      {systemId && (
        <Suspense fallback={null}>
          <ModuleOpened moduleId={moduleId} />
        </Suspense>
      )}
      {systemId && (
        <Suspense fallback={null}>
          <EditSystem systemId={systemId} />
        </Suspense>
      )}
    </>
  );
};

export default Systems;
