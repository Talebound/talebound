import React from 'react';
import Head from 'next/head';
import AdminLayout from '../../components/Layout/AdminLayout';
import AvailableCharacterTags from '../../screens/admin/AvailableTags/AvailableCharacterTags';

const PageAdminCharacterTags: React.FC = () => {
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <AdminLayout>
        <AvailableCharacterTags />
      </AdminLayout>
    </>
  );
};

export default PageAdminCharacterTags;
