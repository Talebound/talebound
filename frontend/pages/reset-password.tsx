import Head from 'next/head';
import React, { useCallback, useMemo } from 'react';
import Layout from '../components/Layout/Layout';
import { HelperMessage } from '../utils/form/helperTypes';
import { validateEmail } from '../utils/form/validateEmail';
import ReCaptcha from 'react-google-recaptcha';
import { getRecaptchaSiteKey } from '../utils/functions/config';
import { useResetPassword } from '../api/auth/useResetPassword';
import { styled } from '../styles/stitches.config';
import { useInput } from '../hooks/useInput';
import Input from '../components/Input/Input';
import { Button } from '../components/Button/Button';
import { Text } from '../components/Typography/Text';
import { TitleH3 } from '../components/Typography/Title';
import { Col } from '../components/Flex/Flex';

const MiddleContainer = styled('div', {
  width: 'min(600px, 80%)',
  display: 'flex',
  alignSelf: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  flexGrow: 1,
  backgroundColor: 'white',
  borderRadius: '$md',
  margin: '1rem',
  padding: '1rem',
  gap: '1rem',
});

export default function ResetPassword() {
  const { value: emailValue, onChange: onChangeEmail } = useInput('');
  const helperEmail: HelperMessage = useMemo(() => validateEmail(emailValue), [emailValue]);

  const resetPasswordSendCode = useResetPassword();

  const buttonDisabled = false;

  const submitResetPassword = useCallback(() => {
    if (buttonDisabled) return;
    if (emailValue === '') return;

    resetPasswordSendCode.mutate({
      email: emailValue,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonDisabled, emailValue]);

  return (
    <>
      <Head>
        <title>Talebound - reset password</title>
      </Head>
      <Layout mandatoryLoggedOut={true}>
        <MiddleContainer>
          <TitleH3>Recover password</TitleH3>
          <Col gap="sm" style={{ width: '320px' }}>
            {resetPasswordSendCode.isSuccess && (
              <>
                <h5>Success!</h5>
                <h5> Email should arrive shortly.</h5>
              </>
            )}
            {!resetPasswordSendCode.isSuccess && (
              <>
                <Input
                  label="Email"
                  id="reg-email"
                  onChange={onChangeEmail}
                  type="text"
                  fullWidth
                  required
                  helperText={helperEmail.text}
                  helperType={helperEmail.type}
                />
                <ReCaptcha sitekey={getRecaptchaSiteKey()} />
                <Button
                  color="primaryFill"
                  size="md"
                  onClick={submitResetPassword}
                  disabled={buttonDisabled}
                >
                  <Text weight="bold" size="lg" color="white">
                    {resetPasswordSendCode.isPending ? 'Sending...' : 'Send reset link'}
                  </Text>
                </Button>

                {resetPasswordSendCode.isError && (
                  <Text color="danger">
                    Error when recovering password. Please refresh and try again. If the problem
                    persists, please contact support at support@talebound.net
                  </Text>
                )}
              </>
            )}
          </Col>
        </MiddleContainer>
      </Layout>
    </>
  );
}
