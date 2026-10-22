import React from 'react';
import Head from 'next/head';
import CreateCharacter from '../../screens/characters/CreateCharacter/CreateCharacter';

const Characters: React.FC = () => {
  return (
    <>
      <Head>
        <title>Create character</title>
      </Head>
      <CreateCharacter />
    </>
  );
};

export default Characters;
