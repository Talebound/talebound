import Head from 'next/head';
import PageAbout from '../screens/about/PageAbout';
import Layout from '../components/Layout/Layout';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Talebound - About</title>
      </Head>
      <Layout>
        <PageAbout />
      </Layout>
    </>
  );
}
