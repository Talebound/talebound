import React, { Suspense } from 'react';
import Link from 'next/link';
import { PbQuestCharacter, PbQuestStatus } from '../../generated/api-types/data-contracts';
import { useGetQuestCharacters } from '../../api/quests/useGetQuestCharacters';
import { useUpdateQuestCharacter } from '../../api/quests/useUpdateQuestCharacter';
import { useDeleteQuestCharacter } from '../../api/quests/useDeleteQuestCharacter';
import { useAuth } from '../../hooks/useAuth';
import { useCharacter } from '../../hooks/useCharacter';
import { useQuest } from '../../hooks/useQuest';
import { ModuleAdminRole, useMyModuleRole } from '../../hooks/useModuleAdmins';
import ContentSection from '../../components/ContentSection/ContentSection';
import { Col, Row } from '../../components/Flex/Flex';
import { Text } from '../../components/Typography/Text';
import { Button } from '../../components/Button/Button';
import ErrorText from '../../components/ErrorText/ErrorText';
import LoadingText from '../../components/Loading/LoadingText';
import AlertDialog from '../../components/AlertDialog/AlertDialog';
import { applicationStatus } from './QuestApplication';

function Participant({
  application,
  canManage,
  finished,
}: {
  application: PbQuestCharacter;
  canManage: boolean;
  finished: boolean;
}) {
  const { character } = useCharacter(application.characterId ?? 0);
  const update = useUpdateQuestCharacter();
  const remove = useDeleteQuestCharacter();
  const questId = application.questId ?? 0;
  const characterId = application.characterId ?? 0;
  const pending = update.isPending || remove.isPending;
  return (
    <Col gap="sm" fullWidth borderBottom paddingBottom="md">
      <Link href={`/characters/${characterId}/detail`}>{character?.name ?? 'Character'}</Link>
      <Text>{applicationStatus(application.approved)}</Text>
      {application.motivationalLetter && (
        <Text css={{ whiteSpace: 'pre-wrap' }}>{application.motivationalLetter}</Text>
      )}
      {canManage && (
        <Row gap="sm" wrap>
          {application.approved !== 1 && !finished && (
            <Button
              disabled={pending}
              onClick={() => update.mutate({ questId, characterId, body: { approved: 1 } })}
            >
              Approve
            </Button>
          )}
          {application.approved === 2 && (
            <Button
              color="secondaryOutline"
              disabled={pending}
              onClick={() => update.mutate({ questId, characterId, body: { approved: 0 } })}
            >
              Decline
            </Button>
          )}
          <AlertDialog
            triggerButtonText="Remove"
            triggerButtonDisabled={pending}
            title="Remove character from quest"
            description="This removes the character's application or participation in this quest."
            dangerButtonText="Remove"
            submitAction={() => remove.mutate({ questId, characterId })}
          />
        </Row>
      )}
      <ErrorText error={update.error ?? remove.error} />
    </Col>
  );
}

export default function QuestCharacters({ questId }: { questId: number }) {
  const { user } = useAuth();
  const { moduleId, quest } = useQuest(questId);
  const { role } = useMyModuleRole(moduleId);
  const canManage = role === ModuleAdminRole.SUPER_COLLABORATOR;
  const {
    data = [],
    isPending,
    error,
  } = useGetQuestCharacters({ variables: { id: questId, viewerId: user?.id ?? 0 } });
  const finished =
    quest?.status === PbQuestStatus.FINISHED_COMPLETED ||
    quest?.status === PbQuestStatus.FINISHED_NOT_COMPLETED;
  return (
    <ContentSection
      direction="column"
      header={canManage ? 'Characters and applications' : 'Characters'}
    >
      <Col gap="md" fullWidth>
        {isPending && <LoadingText />}
        <ErrorText error={error} />
        {!isPending && !error && data.length === 0 && (
          <Text>
            {canManage
              ? 'No applications yet. Open recruitment in quest settings to let characters apply.'
              : 'No accepted characters yet.'}
          </Text>
        )}
        {data.map((application) => (
          <Suspense fallback={<LoadingText />} key={application.characterId}>
            <Participant application={application} canManage={canManage} finished={finished} />
          </Suspense>
        ))}
        {user && <Link href="/characters">Choose a character to find a quest</Link>}
      </Col>
    </ContentSection>
  );
}
