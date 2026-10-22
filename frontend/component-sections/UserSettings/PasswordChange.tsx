import React, { useCallback, useMemo } from 'react';
import PasswordChangeInputs, {
  PasswordChangeStatus,
} from '../../components/PasswordChangeInputs/PasswordChangeInputs';
import { Button } from '../../components/Button/Button';
import ContentSection from '../../components/ContentSection/ContentSection';
import { useUpdateUser } from '../../api/users/useUpdateUser';
import { Col } from '../../components/Flex/Flex';

const PasswordChange: React.FC = () => {
  const [passwordValue, setPasswordValue] = React.useState<string>('');
  const [externalButtonDisabled, setExternalButtonDisabled] = React.useState<boolean>(true);

  const changePassword = useUpdateUser();

  const buttonDisabled = useMemo(
    () => changePassword.isPending || externalButtonDisabled,
    [changePassword.isPending, externalButtonDisabled],
  );

  const submitChangePassword = useCallback(() => {
    if (buttonDisabled) return;

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
          <Button onClick={submitChangePassword}>Change</Button>
        )}
      </Col>
    </ContentSection>
  );
};

export default PasswordChange;
