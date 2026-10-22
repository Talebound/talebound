import Head from 'next/head';
import PageTermsOfService from '../screens/terms-of-service/PageTermsOfService';
import Layout from '../components/Layout/Layout';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Talebound - Terms of service</title>
      </Head>
      <Layout>
        <PageTermsOfService />
      </Layout>
    </>
  );
}
