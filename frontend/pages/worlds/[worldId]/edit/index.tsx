import React, { Suspense } from 'react';
import Head from 'next/head';
import EditWorld from '../../../../screens/worlds/EditWorld/EditWorld';
import useNumericParam from '../../../../hooks/useNumericParam';
import ModuleOpened from '../../../../screens/modules/ModuleOpened';
import { useUrlModuleId } from '../../../../hooks/useUrlModuleId';

const Worlds: React.FC = () => {
  const moduleId = useUrlModuleId();
  const worldId = useNumericParam('worldId');

  return (
    <>
      <Head>
        <title>Worlds</title>
      </Head>
      {worldId && (
        <Suspense fallback={null}>
          <ModuleOpened moduleId={moduleId} />
        </Suspense>
      )}
      {worldId && (
        <Suspense fallback={null}>
          <EditWorld worldId={worldId} />
        </Suspense>
      )}
    </>
  );
};

export default Worlds;
