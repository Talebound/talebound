import React from 'react';
import Head from 'next/head';
import CreateSystem from '../../screens/systems/CreateSystem/CreateSystem';

const Systems: React.FC = () => {
  return (
    <>
      <Head>
        <title>Create system</title>
      </Head>
      <CreateSystem />
    </>
  );
};

export default Systems;
