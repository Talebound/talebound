import React from 'react';
import Head from 'next/head';
import AdminLayout from '../../components/Layout/AdminLayout';
import AvailableQuestTags from '../../screens/admin/AvailableTags/AvailableQuestTags';

const PageAdminQuestTags: React.FC = () => {
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <AdminLayout>
        <AvailableQuestTags />
      </AdminLayout>
    </>
  );
};

export default PageAdminQuestTags;
