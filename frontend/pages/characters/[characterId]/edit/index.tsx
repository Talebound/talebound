import React, { Suspense } from 'react';
import Head from 'next/head';
import EditCharacter from '../../../../screens/characters/EditCharacter/EditCharacter';
import useNumericParam from '../../../../hooks/useNumericParam';
import ModuleOpened from '../../../../screens/modules/ModuleOpened';
import { useUrlModuleId } from '../../../../hooks/useUrlModuleId';

const Characters: React.FC = () => {
  const moduleId = useUrlModuleId();
  const characterId = useNumericParam('characterId');

  return (
    <>
      <Head>
        <title>Characters</title>
      </Head>
      {characterId && (
        <Suspense fallback={null}>
          <ModuleOpened moduleId={moduleId} />
        </Suspense>
      )}
      {characterId && (
        <Suspense fallback={null}>
          <EditCharacter characterId={characterId} />
        </Suspense>
      )}
    </>
  );
};

export default Characters;
