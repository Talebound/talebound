import React, { Suspense } from 'react';
import Link from 'next/link';
import { useGetCharacterQuests } from '../../../../api/characters/useGetCharacterQuests';
import ContentSection from '../../../../components/ContentSection/ContentSection';
import QuestRow from '../../../../components/QuestRow/QuestRow';
import { useCharacter } from '../../../../hooks/useCharacter';
import { useAuth } from '../../../../hooks/useAuth';
import { ModuleAdminRole, useMyModuleRole } from '../../../../hooks/useModuleAdmins';
import { Text } from '../../../../components/Typography/Text';
import { Col } from '../../../../components/Flex/Flex';
import LoadingText from '../../../../components/Loading/LoadingText';
import ErrorText from '../../../../components/ErrorText/ErrorText';
import QuestApplication from '../../../../component-sections/Quest/QuestApplication';

export default function CurrentQuestSection({ characterId }: { characterId: number }) {
  const { moduleId } = useCharacter(characterId);
  const { user } = useAuth();
  const { role } = useMyModuleRole(moduleId);
  const canManage = role === ModuleAdminRole.SUPER_COLLABORATOR;
  const {
    data = [],
    isPending,
    error,
  } = useGetCharacterQuests({ variables: { id: characterId, viewerId: user?.id ?? 0 } });
  return (
    <ContentSection direction="column" header={canManage ? 'Quests and applications' : 'Quests'}>
      <Col gap="md" fullWidth>
        {isPending && <LoadingText />}
        <ErrorText error={error} />
        {!isPending && !error && data.length === 0 && (
          <Text>This character has no quests yet.</Text>
        )}
        {data
          .toSorted((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''))
          .map((application) => (
            <Col key={application.questId} fullWidth gap="sm">
              <Suspense fallback={<LoadingText />}>
                <QuestRow questId={application.questId ?? 0} />
              </Suspense>
              <QuestApplication
                questId={application.questId ?? 0}
                characterId={characterId}
                application={application}
                canManage={canManage}
              />
            </Col>
          ))}
        {canManage && (
          <Link href={`/characters/${characterId}/detail/available-quests`}>
            Search for a quest
          </Link>
        )}
      </Col>
    </ContentSection>
  );
}
