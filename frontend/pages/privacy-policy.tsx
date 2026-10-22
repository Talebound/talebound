import Head from 'next/head';
import PagePrivacyPolicy from '../screens/privacy-policy/PagePrivacyPolicy';
import Layout from '../components/Layout/Layout';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Talebound - Privacy policy</title>
      </Head>
      <Layout>
        <PagePrivacyPolicy />
      </Layout>
    </>
  );
}
