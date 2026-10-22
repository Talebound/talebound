import React from 'react';
import Head from 'next/head';
import AdminLayout from '../../components/Layout/AdminLayout';
import AvailableWorldTags from '../../screens/admin/AvailableTags/AvailableWorldTags';

const PageAdminWorldTags: React.FC = () => {
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <AdminLayout>
        <AvailableWorldTags />
      </AdminLayout>
    </>
  );
};

export default PageAdminWorldTags;
