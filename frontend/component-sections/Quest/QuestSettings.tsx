import React, { useEffect, useState } from 'react';
import { PbQuestStatus } from '../../generated/api-types/data-contracts';
import { useQuest } from '../../hooks/useQuest';
import { useMyModuleRole, ModuleAdminRole } from '../../hooks/useModuleAdmins';
import { useUpdateQuest } from '../../api/quests/useUpdateQuest';
import ContentSection from '../../components/ContentSection/ContentSection';
import Select from '../../components/Select/Select';
import Checkbox from '../../components/Checkbox/Checkbox';
import { Button } from '../../components/Button/Button';
import { Col, Row } from '../../components/Flex/Flex';
import { Text } from '../../components/Typography/Text';
import ErrorText from '../../components/ErrorText/ErrorText';

export default function QuestSettings({ questId }: { questId: number }) {
  const { quest, moduleId } = useQuest(questId);
  const { role } = useMyModuleRole(moduleId);
  const mutation = useUpdateQuest();
  const [status, setStatus] = useState(PbQuestStatus.NOT_STARTED);
  const [canJoin, setCanJoin] = useState(false);
  useEffect(() => {
    setStatus(quest?.status ?? PbQuestStatus.NOT_STARTED);
    setCanJoin(quest?.canJoin ?? false);
  }, [quest?.status, quest?.canJoin]);
  const finished =
    status === PbQuestStatus.FINISHED_COMPLETED || status === PbQuestStatus.FINISHED_NOT_COMPLETED;
  const disabled = role !== ModuleAdminRole.SUPER_COLLABORATOR || mutation.isPending;
  return (
    <ContentSection direction="column" header="Quest settings">
      <Col gap="md" fullWidth>
        <Select
          id="quest-status"
          label="Quest status"
          value={status}
          disabled={disabled}
          onValueChange={(value) => {
            const next = value as PbQuestStatus;
            setStatus(next);
            if (
              next === PbQuestStatus.FINISHED_COMPLETED ||
              next === PbQuestStatus.FINISHED_NOT_COMPLETED
            )
              setCanJoin(false);
          }}
          options={{
            type: 'options',
            options: [
              { value: PbQuestStatus.NOT_STARTED, label: 'Not started' },
              { value: PbQuestStatus.IN_PROGRESS, label: 'In progress' },
              { value: PbQuestStatus.FINISHED_COMPLETED, label: 'Finished' },
              { value: PbQuestStatus.FINISHED_NOT_COMPLETED, label: 'Abandoned' },
            ],
          }}
        />
        <Row gap="sm">
          <Checkbox
            id="quest-recruitment"
            checked={canJoin && !finished}
            disabled={disabled || finished}
            onCheckedChange={(value) => setCanJoin(value === true)}
          />
          <label htmlFor="quest-recruitment">Accepting applications</label>
        </Row>
        <Text size="sm">
          Characters must use the same world and system. Finished quests are closed to new
          applications.
        </Text>
        <Button
          disabled={disabled}
          loading={mutation.isPending}
          onClick={() =>
            mutation.mutate({ questId, body: { status, canJoin: canJoin && !finished } })
          }
        >
          Save quest settings
        </Button>
        {mutation.isSuccess && <Text role="status">Quest settings saved.</Text>}
        <ErrorText error={mutation.error} />
      </Col>
    </ContentSection>
  );
}
