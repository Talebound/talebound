import React from 'react';
import Head from 'next/head';
import CharacterList from '../../screens/characters/CharacterList/CharacterList';

const Characters: React.FC = () => {
  return (
    <>
      <Head>
        <title>Characters</title>
      </Head>
      <CharacterList />
    </>
  );
};

export default Characters;
