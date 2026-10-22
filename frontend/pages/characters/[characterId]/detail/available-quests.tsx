import React, { Suspense } from 'react';
import Head from 'next/head';
import useNumericParam from '../../../../hooks/useNumericParam';
import ModuleOpened from '../../../../screens/modules/ModuleOpened';
import { useUrlModuleId } from '../../../../hooks/useUrlModuleId';
import AvailableCharacterQuests from '../../../../screens/characters/DetailCharacter/AvailableQuests/AvailableQuests';

const AvailableQuestsScreen: React.FC = () => {
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
          <AvailableCharacterQuests characterId={characterId} />
        </Suspense>
      )}
    </>
  );
};

export default AvailableQuestsScreen;
