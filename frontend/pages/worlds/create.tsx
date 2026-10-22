import React from 'react';
import Head from 'next/head';
import CreateWorld from '../../screens/worlds/CreateWorld/CreateWorld';

const Worlds: React.FC = () => {
  return (
    <>
      <Head>
        <title>Create world</title>
      </Head>
      <CreateWorld />
    </>
  );
};

export default Worlds;
