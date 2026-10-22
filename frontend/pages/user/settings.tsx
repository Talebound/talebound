import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout/Layout';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';
import AvatarChange from '../../component-sections/UserSettings/AvatarChange';
import PasswordChange from '../../component-sections/UserSettings/PasswordChange';
import SelfEvaluation from '../../component-sections/UserSettings/SelfEvaluation';
import { Col, Row } from '../../components/Flex/Flex';

const Settings: React.FC = () => {
  return (
    <>
      <Head>
        <title>User settings</title>
      </Head>
      <Layout mandatoryLogin={true} vertical={true} navbar={<LeftNavbar />}>
        <Row alignItems="start" css={{ flexWrap: 'wrap' }}>
          <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
            <AvatarChange />
            <PasswordChange />
          </Col>
          <Col css={{ flexGrow: 1, flexBasis: '30rem' }}>
            <SelfEvaluation />
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default Settings;
