import React, { useEffect, useMemo } from 'react';
import { HelperMessage } from '../../utils/form/helperTypes';
import { validatePassword, validatePasswordAgain } from '../../utils/form/validatePassword';
import { useInput } from '../../hooks/useInput';
import Input from '../Input/Input';
import { Row } from '../Flex/Flex';
import Loading from '../Loading/Loading';

export enum PasswordChangeStatus {
  PasswordSuccess = 'password-success',
  CodeVerify = 'code-verify',
  CodeInvalid = 'code-invalid',
  PasswordForm = 'password-form',
}

interface PasswordChangeInputsProps {
  display: PasswordChangeStatus;
  setPasswordValue?: React.Dispatch<React.SetStateAction<string>>;
  setButtonDisabled?: React.Dispatch<React.SetStateAction<boolean>>;
  successMessage?: React.ReactNode;
}

const PasswordChangeInputs: React.FC<PasswordChangeInputsProps> = ({
  display,
  setPasswordValue,
  setButtonDisabled,
  successMessage,
}) => {
  const { value: password1Value, onChange: onChangePassword1 } = useInput<string>('');
  const { value: password2Value, onChange: onChangePassword2 } = useInput<string>('');

  const helperPassword1: HelperMessage = useMemo(
    () => validatePassword(password1Value),
    [password1Value],
  );
  const helperPassword2: HelperMessage = useMemo(
    () => validatePasswordAgain(password1Value, password2Value),
    [password1Value, password2Value],
  );

  useEffect(() => {
    if (setPasswordValue) setPasswordValue(password1Value);
  }, [password1Value, setPasswordValue]);

  const buttonDisabled = useMemo(
    () =>
      password1Value === '' ||
      password2Value === '' ||
      password1Value !== password2Value ||
      password1Value.length < 6,
    [password1Value, password2Value],
  );

  useEffect(() => {
    if (setButtonDisabled) setButtonDisabled(buttonDisabled);
  }, [buttonDisabled, setButtonDisabled]);

  return (
    <>
      {display === PasswordChangeStatus.PasswordSuccess && <h5>{successMessage}</h5>}
      {display === PasswordChangeStatus.CodeVerify && (
        <Row>
          <Loading color="secondary" />
          Verifying code...
        </Row>
      )}
      {display === PasswordChangeStatus.CodeInvalid && (
        <h5>Code is invalid or expired. Please try again</h5>
      )}
      {display === PasswordChangeStatus.PasswordForm && (
        <>
          <Input
            id="reg-pass1"
            label="Password"
            type="password"
            onChange={onChangePassword1}
            fullWidth
            required
            helperType={helperPassword1.type}
            helperText={helperPassword1.text}
          />
          <Input
            id="reg-pass2"
            label="Password again"
            type="password"
            onChange={onChangePassword2}
            fullWidth
            required
            helperType={helperPassword2.type}
            helperText={helperPassword2.text}
          />
        </>
      )}
    </>
  );
};

export default PasswordChangeInputs;
