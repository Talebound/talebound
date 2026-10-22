import React, { useCallback } from 'react';
import ContentSection from '../../../../components/ContentSection/ContentSection';
import { Button } from '../../../../components/Button/Button';
import Textarea from '../../../../components/Textarea/Textarea';
import { useCreateModuleAdmin } from '../../../../api/modules/useCreateModuleAdmin';
import ErrorText from '../../../../components/ErrorText/ErrorText';
import { useInput } from '../../../../hooks/useInput';
import { useMyModuleRole, ModuleAdminRole } from '../../../../hooks/useModuleAdmins';
import { TbShieldOff, TbShieldQuestion } from 'react-icons/tb';
import { Row } from '../../../../components/Flex/Flex';
import { Text } from '../../../../components/Typography/Text';
import { useAuth } from '../../../../hooks/useAuth';

interface NewCollaboratorRequestProps {
  moduleId: number;
}

const textareaPlaceholder =
  'What would you like to do here as collaborator? How much experience do you have with this?';

const NewCollaboratorRequest: React.FC<NewCollaboratorRequestProps> = ({ moduleId }) => {
  const { roleWithoutAdmin } = useMyModuleRole(moduleId);
  const { isLoggedIn } = useAuth();
  const { mutate: createModuleAdmin, isPending, error } = useCreateModuleAdmin();
  const { value: motivation, onChange } = useInput<string, HTMLTextAreaElement>('');

  const sendCollaboratorRequest = useCallback(() => {
    createModuleAdmin({
      moduleId: moduleId,
      motivationalLetter: motivation,
    });
  }, [createModuleAdmin, motivation, moduleId]);

  switch (roleWithoutAdmin) {
    case ModuleAdminRole.SUPER_COLLABORATOR:
    case ModuleAdminRole.COLLABORATOR:
      return null;
    case ModuleAdminRole.NONE:
      if (!isLoggedIn) {
        return null;
      }
      return (
        <ContentSection flexWrap="wrap" direction="column" header="Become a collaborator">
          <Textarea
            id="motivational-letter"
            label="Motivational letter"
            placeholder={textareaPlaceholder}
            rows={5}
            value={motivation}
            onChange={onChange}
          />
          <Button loading={isPending} onClick={sendCollaboratorRequest}>
            Send request
          </Button>
          <ErrorText error={error} />
        </ContentSection>
      );
    case ModuleAdminRole.REQUESTED:
      return (
        <ContentSection flexWrap="wrap" direction="column" header="Request pending">
          <Row gap="md">
            <Text color="secondary">
              <TbShieldQuestion size={30} />
            </Text>
            <p>Your request has been sent. Please wait for the admin to accept it.</p>
          </Row>
        </ContentSection>
      );
    case ModuleAdminRole.DENIED:
      return (
        <ContentSection flexWrap="wrap" direction="column" header="Request denied">
          <Row gap="md">
            <Text color="danger">
              <TbShieldOff size={30} />
            </Text>
            <p>Your request was denied.</p>
          </Row>
        </ContentSection>
      );
  }
};

export default NewCollaboratorRequest;
