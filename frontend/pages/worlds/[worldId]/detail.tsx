import React, { Suspense } from 'react';
import Head from 'next/head';
import useNumericParam from '../../../hooks/useNumericParam';
import ModuleOpened from '../../../screens/modules/ModuleOpened';
import DetailWorld from '../../../screens/worlds/DetailWorld/DetailWorld';
import { useUrlModuleId } from '../../../hooks/useUrlModuleId';

const Worlds: React.FC = () => {
  const moduleId = useUrlModuleId();
  const worldId = useNumericParam('worldId');

  return (
    <>
      <Head>
        <title>World detail</title>
      </Head>
      {moduleId && (
        <Suspense fallback={null}>
          <ModuleOpened moduleId={moduleId} />
        </Suspense>
      )}
      {worldId && (
        <Suspense fallback={null}>
          <DetailWorld worldId={worldId} />
        </Suspense>
      )}
    </>
  );
};

export default Worlds;
