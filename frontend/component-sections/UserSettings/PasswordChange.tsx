import React, { useCallback, useMemo, useRef } from 'react';
import PasswordChangeInputs, {
  PasswordChangeStatus,
} from '../../components/PasswordChangeInputs/PasswordChangeInputs';
import { Button } from '../../components/Button/Button';
import ContentSection from '../../components/ContentSection/ContentSection';
import { useUpdateUser } from '../../api/users/useUpdateUser';
import ErrorText from '../../components/ErrorText/ErrorText';
import { Col } from '../../components/Flex/Flex';

const PasswordChange: React.FC = () => {
  const [passwordValue, setPasswordValue] = React.useState<string>('');
  const [externalButtonDisabled, setExternalButtonDisabled] = React.useState<boolean>(true);

  const submitting = useRef(false);
  const changePassword = useUpdateUser({
    onSettled: () => {
      submitting.current = false;
    },
  });

  const buttonDisabled = useMemo(
    () => changePassword.isPending || externalButtonDisabled,
    [changePassword.isPending, externalButtonDisabled],
  );

  const submitChangePassword = useCallback(() => {
    if (buttonDisabled || submitting.current) return;
    submitting.current = true;

    changePassword.mutate({
      password: passwordValue,
    });
  }, [buttonDisabled, changePassword, passwordValue]);

  const display: PasswordChangeStatus = useMemo(() => {
    if (changePassword.isSuccess) return PasswordChangeStatus.PasswordSuccess;
    return PasswordChangeStatus.PasswordForm;
  }, [changePassword.isSuccess]);

  return (
    <ContentSection header="Change password">
      <Col css={{ width: '320px' }}>
        <PasswordChangeInputs
          display={display}
          setPasswordValue={setPasswordValue}
          setButtonDisabled={setExternalButtonDisabled}
          successMessage="Password changed successfully."
        />
        {display === PasswordChangeStatus.PasswordForm && (
          <Button
            onClick={submitChangePassword}
            disabled={buttonDisabled}
            loading={changePassword.isPending}
          >
            Change
          </Button>
        )}
        <ErrorText error={changePassword.error} />
      </Col>
    </ContentSection>
  );
};

export default PasswordChange;
