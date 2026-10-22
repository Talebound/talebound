import React, { useEffect, useState } from 'react';
import { PbQuestCharacter } from '../../generated/api-types/data-contracts';
import { useCreateQuestCharacter } from '../../api/quests/useCreateQuestCharacter';
import { useUpdateQuestCharacter } from '../../api/quests/useUpdateQuestCharacter';
import { useDeleteQuestCharacter } from '../../api/quests/useDeleteQuestCharacter';
import { Col, Row } from '../../components/Flex/Flex';
import { Text } from '../../components/Typography/Text';
import Textarea from '../../components/Textarea/Textarea';
import { Button } from '../../components/Button/Button';
import ErrorText from '../../components/ErrorText/ErrorText';
import AlertDialog from '../../components/AlertDialog/AlertDialog';

export const applicationStatus = (approved?: number) =>
  approved === 1 ? 'Accepted' : approved === 0 ? 'Declined' : 'Pending approval';

interface QuestApplicationProps {
  questId: number;
  characterId: number;
  application?: PbQuestCharacter;
  canManage: boolean;
  canApply?: boolean;
}

export default function QuestApplication({
  questId,
  characterId,
  application,
  canManage,
  canApply = false,
}: QuestApplicationProps) {
  const [letter, setLetter] = useState(application?.motivationalLetter ?? '');
  useEffect(
    () => setLetter(application?.motivationalLetter ?? ''),
    [application?.motivationalLetter],
  );
  const create = useCreateQuestCharacter();
  const update = useUpdateQuestCharacter();
  const remove = useDeleteQuestCharacter();
  const pending = create.isPending || update.isPending || remove.isPending;
  if (!application && (!canManage || !canApply)) return null;
  const removeLabel = application?.approved === 1 ? 'Leave quest' : 'Withdraw application';
  return (
    <Col gap="sm" fullWidth>
      {application && <Text b>{applicationStatus(application.approved)}</Text>}
      {canManage && (!application || application.approved === 2) && (
        <>
          <Textarea
            id={`application-${questId}-${characterId}`}
            label="Application message (optional)"
            value={letter}
            onChange={(event) => setLetter(event.target.value)}
            maxLength={5000}
            rows={3}
            fullWidth
            disabled={pending}
          />
          <Button
            disabled={pending}
            loading={pending}
            onClick={() =>
              application
                ? update.mutate({ questId, characterId, body: { motivationalLetter: letter } })
                : create.mutate({ questId, characterId, data: { motivationalLetter: letter } })
            }
          >
            {application ? 'Update application' : 'Apply to quest'}
          </Button>
        </>
      )}
      {canManage && application && (
        <Row gap="sm">
          <AlertDialog
            triggerButtonText={removeLabel}
            triggerButtonDisabled={pending}
            title={removeLabel}
            description="You can apply again while the quest is accepting applications. A new application will need approval."
            dangerButtonText={removeLabel}
            submitAction={() => remove.mutate({ questId, characterId })}
          />
        </Row>
      )}
      <ErrorText error={create.error ?? update.error ?? remove.error} />
    </Col>
  );
}
