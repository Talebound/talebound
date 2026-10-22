import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout/Layout';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';
import { Col } from '../../components/Flex/Flex';

const News: React.FC = () => {
  return (
    <>
      <Head>
        <title>Talebound</title>
      </Head>
      <Layout mandatoryLogin={true}>
        <LeftNavbar />
        <Col gap="lg" padding="lg"></Col>
      </Layout>
    </>
  );
};

export default News;
