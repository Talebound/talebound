import React, { Suspense } from 'react';
import Head from 'next/head';
import EditQuest from '../../../../screens/quests/EditQuest/EditQuest';
import useNumericParam from '../../../../hooks/useNumericParam';
import ModuleOpened from '../../../../screens/modules/ModuleOpened';
import { useUrlModuleId } from '../../../../hooks/useUrlModuleId';

const Quests: React.FC = () => {
  const moduleId = useUrlModuleId();
  const questId = useNumericParam('questId');

  return (
    <>
      <Head>
        <title>Quests</title>
      </Head>
      {questId && (
        <Suspense fallback={null}>
          <ModuleOpened moduleId={moduleId} />
        </Suspense>
      )}
      {questId && (
        <Suspense fallback={null}>
          <EditQuest questId={questId} />
        </Suspense>
      )}
    </>
  );
};

export default Quests;
