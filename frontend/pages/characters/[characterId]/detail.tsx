import React, { Suspense } from 'react';
import Head from 'next/head';
import useNumericParam from '../../../hooks/useNumericParam';
import ModuleOpened from '../../../screens/modules/ModuleOpened';
import DetailCharacter from '../../../screens/characters/DetailCharacter/DetailCharacter';
import { useUrlModuleId } from '../../../hooks/useUrlModuleId';

const Characters: React.FC = () => {
  const moduleId = useUrlModuleId();
  const characterId = useNumericParam('characterId');

  return (
    <>
      <Head>
        <title>Character detail</title>
      </Head>
      {moduleId && (
        <Suspense fallback={null}>
          <ModuleOpened moduleId={moduleId} />
        </Suspense>
      )}
      {characterId && (
        <Suspense fallback={null}>
          <DetailCharacter characterId={characterId} />
        </Suspense>
      )}
    </>
  );
};

export default Characters;
