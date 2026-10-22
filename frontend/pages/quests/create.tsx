import React from 'react';
import Head from 'next/head';
import CreateQuest from '../../screens/quests/CreateQuest/CreateQuest';

const Quests: React.FC = () => {
  return (
    <>
      <Head>
        <title>Create quest</title>
      </Head>
      <CreateQuest />
    </>
  );
};

export default Quests;
