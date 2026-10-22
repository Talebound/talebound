import HomepageHeader from '../component-sections/homepage/HomepageHeader';
import Register from '../component-sections/homepage/Register';
import Head from 'next/head';

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Talebound - register</title>
      </Head>
      <HomepageHeader />
      <Register />
    </>
  );
}
