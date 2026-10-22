import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import { styled } from '../styles/stitches.config';
import Loading from '../components/Loading/Loading';
import { Row } from '../components/Flex/Flex';
import { TitleH3 } from '../components/Typography/Title';
import { useVerify } from '../api/auth/useVerify';
import { Text } from '../components/Typography/Text';

const MiddleContainer = styled('div', {
  width: 'min(600px, 80%)',
  display: 'flex',
  alignSelf: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  // flexGrow: 1,
  backgroundColor: 'white',
  borderRadius: '$md',
  margin: '1rem',
  padding: '1rem',
  gap: '1rem',
});

export default function Verify() {
  const router = useRouter();
  const { id, secret_code } = router.query;
  const [attempted, setAttempted] = useState(false);

  const verify = useVerify();

  useEffect(() => {
    if (!id || !secret_code || attempted) return;

    verify.mutate({
      emailId: id as string,
      secretCode: secret_code as string,
    });

    setAttempted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempted, id, secret_code]); //verify

  return (
    <>
      <Head>
        <title>Talebound - verify email</title>
      </Head>
      <Layout centered>
        <MiddleContainer>
          <TitleH3>Verify email</TitleH3>
          {verify.isSuccess && verify.data?.data.isVerified && (
            <Text size="lg" color="success">
              Email verified! You can now sign in.
            </Text>
          )}
          {verify.isPending && (
            <Row gap="md">
              <Loading color="secondary" />
              <Text size="lg">Verifying email...</Text>
            </Row>
          )}
          {(verify.isError || verify.data?.data.isVerified === false) && (
            <Text size="lg" color="danger">
              Code is invalid, expired or email already verified.
            </Text>
          )}
        </MiddleContainer>
      </Layout>
    </>
  );
}
