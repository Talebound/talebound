import React from 'react';
import Head from 'next/head';
import AdminLayout from '../../components/Layout/AdminLayout';

const PageAdminDashboard: React.FC = () => {
  return (
    <>
      <Head>
        <title>Admin - dashboard</title>
      </Head>
      <AdminLayout>Here will be some cool statistics</AdminLayout>
    </>
  );
};

export default PageAdminDashboard;
