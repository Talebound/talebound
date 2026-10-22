'use client';

import React, { KeyboardEvent, useCallback, useMemo } from 'react';
import { VerticalSemitransparent } from '../../components/VerticalSemitransparent/VerticalSemitransparent';
import Input from '../../components/Input/Input';
import Link from 'next/link';
import { useLogin } from '../../api/auth/useLogin';
import { useRouter } from 'next/router';
import { setUser } from '../../utils/auth/userSlice';
import { useDispatch } from 'react-redux';
import { Client } from 'react-hydration-provider';
import { useInput } from '../../hooks/useInput';
import { styled } from '../../styles/stitches.config';
import { Button } from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import { Text } from '../../components/Typography/Text';

const LoginBox = styled(VerticalSemitransparent, {
  position: 'absolute',
  top: '0',
  right: '0',
  bottom: '0',
  padding: '$2xl $md',
  fontWeight: '$bold',
  fontSize: '$xl',
  color: '$primary800',
  textDecoration: 'none',
  width: '200px',

  '@media (max-width: 600px)': {
    bottom: '0',
    top: '100px',
    right: '0',
    transform: 'translate(0, 0)',
    width: '100%',
    gap: '$md',
    justifyContent: 'flex-end',

    '& h3': {
      marginBottom: '$0',
      display: 'none',
    },

    [`& ${Input}`]: {
      maxWidth: '400px',
      width: '75%',
    },
  },
});

const LoginButtonWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$xs',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',

  '@media (max-width: 600px)': {
    flexDirection: 'row',
    gap: '$lg',
    fontSize: '$lg',
    lineHeight: '$fontSize$lg',

    '& p': {
      fontSize: '$sm',
      lineHeight: '$fontSize$sm',
    },
  },
});

const ForgotPassword = styled(Link, {
  fontSize: '$sm',
  color: '$white',
  marginTop: '$md',
  marginBottom: '$md',
  paddingTop: '$xs',
  paddingBottom: '$xs',
  paddingLeft: '$sm',
  paddingRight: '$sm',
  borderTop: '1px solid $primary300',
  borderBottom: '1px solid $primary300',
  opacity: 1,

  '&:hover': {
    opacity: 0.8,
  },
});

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const login = useLogin({
    onSuccess: (data) => {
      dispatch(setUser(data.data.user));
      void router.push('/home');
    },
  });

  const { value: usernameValue, onChange: onChangeUsername } = useInput('');
  const { value: passwordValue, onChange: onChangePassword } = useInput('');

  const buttonDisabled = useMemo(
    () => !passwordValue || !usernameValue || login.isPending,
    [passwordValue, usernameValue, login.isPending],
  );

  const submitLogin = useCallback(() => {
    if (usernameValue === '' || passwordValue === '') return;

    login.mutate({
      username: usernameValue,
      password: passwordValue,
    });
  }, [usernameValue, passwordValue, login]);

  const submitOnEnter = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.code === 'Enter') submitLogin();
    },
    [submitLogin],
  );

  return (
    <Client>
      <LoginBox>
        <h3 id="login">Login</h3>
        <Input
          id="login-username"
          onChange={onChangeUsername}
          aria-labelledby="login"
          placeholder="Username"
          required
          onKeyDown={submitOnEnter}
          fullWidth
          mode="transparent"
        />
        <Input
          id="login-password"
          type={'password'}
          onChange={onChangePassword}
          aria-labelledby="login"
          placeholder="Password"
          required
          onKeyDown={submitOnEnter}
          fullWidth
          mode="transparent"
        />
        <LoginButtonWrapper>
          <Button color="primaryFill" size="md" onClick={submitLogin} disabled={buttonDisabled}>
            {login.isPending || login.isSuccess ? (
              <Loading color="currentColor" size="xs" />
            ) : (
              <Text weight="bold" size="lg" color="white">
                Sign in
              </Text>
            )}
          </Button>
          <Text size="sm">or</Text>
          <Link href="/#register">Sign up</Link>
          <ForgotPassword href="/reset-password">Forgot password?</ForgotPassword>

          {login.isError && !login.isPending && <Text color="danger">Something went wrong.</Text>}
        </LoginButtonWrapper>
      </LoginBox>
    </Client>
  );
};

export default Login;
