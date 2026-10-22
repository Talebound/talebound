'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { VerticalSemitransparent } from '../../components/VerticalSemitransparent/VerticalSemitransparent';
import Input from '../../components/Input/Input';
import { HelperMessage } from '../../utils/form/helperTypes';
import { validateEmail } from '../../utils/form/validateEmail';
import { validateUsername } from '../../utils/form/validateUsername';
import { validatePassword, validatePasswordAgain } from '../../utils/form/validatePassword';
import PageTermsOfService from '../../screens/terms-of-service/PageTermsOfService';
import PagePrivacyPolicy from '../../screens/privacy-policy/PagePrivacyPolicy';
import { ClickableSpan } from '../../components/ClickableSpan/ClickableSpan';
import { useCreateUser } from '../../api/users/useCreateUser';
import { Client } from 'react-hydration-provider';
import { styled } from '../../styles/stitches.config';
import { useInput } from '../../hooks/useInput';
import { Button } from '../../components/Button/Button';
import { TitleH4 } from '../../components/Typography/Title';
import { Text } from '../../components/Typography/Text';
import Checkbox from '../../components/Checkbox/Checkbox';
import Modal from '../../components/Modal/Modal';

const RegisterBackground = styled('div', {
  position: 'relative',
  width: '$full',
  height: '600px',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  margin: '-$sm',
  maskImage:
    'linear-gradient(45deg, rgba(255, 255, 255, 0) 0%, #ffffff 35%, #ffffff 65%,  rgba(255, 255, 255, 0) 100%)',
  backgroundImage: '$$backgroundImage',

  '@xsMax': {
    maskImage: 'none',
  },
});

const RegisterBox = styled(VerticalSemitransparent, {
  gap: '$sm',
  position: 'absolute',
  top: '$0',
  bottom: '$0',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  padding: '$2xl $xl',
  fontSize: '$xs',
  color: '$white600',
  textDecoration: 'none',
  minWidth: '33%',

  label: {
    fontWeight: '$bold',
  },

  '@xsMax': {
    left: '$0',
    right: '$0',
    transform: 'translate(0%, 0%)',
  },

  '& .nextui-input-helper-text-container': {
    width: '$full',
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const RegisterHeader = styled('h2', {
  color: '$white',
});

interface HomepageRegisterProps {
  background?: boolean;
}

const Register: React.FC<HomepageRegisterProps> = ({ background = false }) => {
  const [checked, setChecked] = useState(false);

  const createUser = useCreateUser();

  const { value: usernameValue, onChange: onChangeUsername } = useInput('');
  const { value: emailValue, onChange: onChangeEmail } = useInput('');
  const { value: password1Value, onChange: onChangePassword1 } = useInput('');
  const { value: password2Value, onChange: onChangePassword2 } = useInput('');

  const helperUsername: HelperMessage = useMemo(
    () => validateUsername(usernameValue),
    [usernameValue],
  );
  const helperEmail: HelperMessage = useMemo(() => validateEmail(emailValue), [emailValue]);
  const helperPassword1: HelperMessage = useMemo(
    () => validatePassword(password1Value),
    [password1Value],
  );
  const helperPassword2: HelperMessage = useMemo(
    () => validatePasswordAgain(password1Value, password2Value),
    [password1Value, password2Value],
  );

  /**
   * Link to open modal is inside a label, so we need to reverse the checkbox state
   * If we try to prevent default instead, modal won't open
   */
  const handleModalOpen = useCallback(() => {
    setChecked((p) => !p);
  }, []);

  const handleCheckbox = useCallback((v: boolean) => {
    setChecked(v);
  }, []);

  const buttonDisabled = useMemo(() => !checked || createUser.isPending, [checked, createUser]);

  const submitNewUser = useCallback(() => {
    if (buttonDisabled) return;
    if (usernameValue === '' || emailValue === '' || password1Value === '' || password2Value === '')
      return;

    createUser.mutate({
      username: usernameValue,
      email: emailValue,
      password: password1Value,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonDisabled, usernameValue, emailValue, password1Value, password2Value]);

  return (
    <Client>
      <RegisterBackground
        id="register"
        css={{ $$backgroundImage: background ? 'url("../assets/images/register-bg.png")' : '' }}
      >
        <RegisterBox>
          {createUser.isSuccess && (
            <>
              <RegisterHeader>User created!</RegisterHeader>
              <TitleH4 color="white" css={{ textAlign: 'center' }}>
                Please, check your email for verification link and sign in
              </TitleH4>
            </>
          )}
          {!createUser.isSuccess && (
            <>
              <RegisterHeader>Sign up</RegisterHeader>

              <Input
                label="Username"
                id="reg-username"
                type="text"
                onChange={onChangeUsername}
                fullWidth
                required
                helperText={helperUsername.text}
                helperType={helperUsername.type}
                mode="transparent"
              />
              <Input
                label="Email"
                id="reg-email"
                onChange={onChangeEmail}
                type="text"
                fullWidth
                required
                helperText={helperEmail.text}
                helperType={helperEmail.type}
                mode="transparent"
              />
              <Input
                label="Password"
                id="reg-pass1"
                type="password"
                onChange={onChangePassword1}
                fullWidth
                required
                helperText={helperPassword1.text}
                helperType={helperPassword1.type}
                mode="transparent"
              />
              <Input
                label="Password again"
                type="password"
                id="reg-pass2"
                onChange={onChangePassword2}
                fullWidth
                required
                helperText={helperPassword2.text}
                helperType={helperPassword2.type}
                mode="transparent"
              />
              <Checkbox
                id="req_checkbox"
                checked={checked}
                onCheckedChange={handleCheckbox}
                mode="transparent"
              >
                <Text size="xs" color="white">
                  I agree to the{' '}
                  <Modal
                    trigger={
                      <ClickableSpan onClick={handleModalOpen}>Terms of Service</ClickableSpan>
                    }
                    content={<PageTermsOfService />}
                  />{' '}
                  and I have read the{' '}
                  <Modal
                    trigger={
                      <ClickableSpan onClick={handleModalOpen}>Privacy Policy</ClickableSpan>
                    }
                    content={<PagePrivacyPolicy />}
                  />
                </Text>
              </Checkbox>
              <div>
                <Button onClick={submitNewUser} disabled={buttonDisabled}>
                  <Text weight="bold" size="lg" color="white">
                    {createUser.isPending ? 'Creating...' : 'Sign up'}
                  </Text>
                </Button>
              </div>

              {createUser.isError && (
                <Text color="danger">
                  Error when creating user. Please check the fields and try again.
                </Text>
              )}
            </>
          )}
        </RegisterBox>
      </RegisterBackground>
    </Client>
  );
};

export default Register;
