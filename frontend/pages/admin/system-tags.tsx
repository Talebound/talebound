import React from 'react';
import Head from 'next/head';
import AdminLayout from '../../components/Layout/AdminLayout';
import AvailableSystemTags from '../../screens/admin/AvailableTags/AvailableSystemTags';

const PageAdminSystemTags: React.FC = () => {
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <AdminLayout>
        <AvailableSystemTags />
      </AdminLayout>
    </>
  );
};

export default PageAdminSystemTags;
