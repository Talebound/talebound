import React from 'react';
import Head from 'next/head';
import QuestList from '../../screens/quests/QuestList/QuestList';

const Quests: React.FC = () => {
  return (
    <>
      <Head>
        <title>Quests</title>
      </Head>
      <QuestList />
    </>
  );
};

export default Quests;
