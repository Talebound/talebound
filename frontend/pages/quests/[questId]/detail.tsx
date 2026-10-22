import React, { Suspense } from 'react';
import Head from 'next/head';
import useNumericParam from '../../../hooks/useNumericParam';
import ModuleOpened from '../../../screens/modules/ModuleOpened';
import DetailQuest from '../../../screens/quests/DetailQuest/DetailQuest';
import { useUrlModuleId } from '../../../hooks/useUrlModuleId';

const Quests: React.FC = () => {
  const moduleId = useUrlModuleId();
  const questId = useNumericParam('questId');

  return (
    <>
      <Head>
        <title>Quest detail</title>
      </Head>
      {moduleId && (
        <Suspense fallback={null}>
          <ModuleOpened moduleId={moduleId} />
        </Suspense>
      )}
      {questId && (
        <Suspense fallback={null}>
          <DetailQuest questId={questId} />
        </Suspense>
      )}
    </>
  );
};

export default Quests;
