import React, { Suspense } from 'react';
import Head from 'next/head';
import useNumericParam from '../../../hooks/useNumericParam';
import ModuleOpened from '../../../screens/modules/ModuleOpened';
import DetailSystem from '../../../screens/systems/DetailSystem/DetailSystem';
import { useUrlModuleId } from '../../../hooks/useUrlModuleId';

const Systems: React.FC = () => {
  const moduleId = useUrlModuleId();
  const systemId = useNumericParam('systemId');

  return (
    <>
      <Head>
        <title>System detail</title>
      </Head>
      {moduleId && (
        <Suspense fallback={null}>
          <ModuleOpened moduleId={moduleId} />
        </Suspense>
      )}
      {systemId && (
        <Suspense fallback={null}>
          <DetailSystem systemId={systemId} />
        </Suspense>
      )}
    </>
  );
};

export default Systems;
