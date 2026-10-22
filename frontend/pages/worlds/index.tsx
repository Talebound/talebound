import React from 'react';
import Head from 'next/head';
import WorldList from '../../screens/worlds/WorldList/WorldList';

const Worlds: React.FC = () => {
  return (
    <>
      <Head>
        <title>Worlds</title>
      </Head>
      <WorldList />
    </>
  );
};

export default Worlds;
