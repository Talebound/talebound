import React from 'react';
import Head from 'next/head';
import Layout from '../../../components/Layout/Layout';
import LeftNavbar from '../../../components/LeftNavbar/LeftNavbar';
import { Row } from '../../../components/Flex/Flex';
import UserProfile from '../../../component-sections/UserProfile/UserProfile';
import useNumericParam from '../../../hooks/useNumericParam';

const Profile: React.FC = () => {
  const userId = useNumericParam('userId');

  return (
    <>
      <Head>
        <title>User profile</title>
      </Head>
      <Layout mandatoryLogin={false} vertical={true} navbar={<LeftNavbar />}>
        <Row alignItems="start" css={{ flexWrap: 'wrap' }}>
          {userId && <UserProfile userId={userId} />}
        </Row>
      </Layout>
    </>
  );
};

export default Profile;
