import HomepageContent from '../component-sections/homepage/HomepageContent';
import Register from '../component-sections/homepage/Register';
import Head from 'next/head';
import { Client } from 'react-hydration-provider';
import React from 'react';
import Layout from '../components/Layout/Layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Talebound</title>
      </Head>
      <Layout vertical>
        <HomepageContent />
        <Client>
          <Register background />
        </Client>
      </Layout>
    </>
  );
}
