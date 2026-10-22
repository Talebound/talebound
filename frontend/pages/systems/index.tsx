import React from 'react';
import Head from 'next/head';
import SystemList from '../../screens/systems/SystemList/SystemList';

const Systems: React.FC = () => {
  return (
    <>
      <Head>
        <title>Systems</title>
      </Head>
      <SystemList />
    </>
  );
};

export default Systems;
