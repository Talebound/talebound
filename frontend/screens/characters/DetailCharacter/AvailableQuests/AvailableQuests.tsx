import QuestApplication from '../../../../component-sections/Quest/QuestApplication';
import { useAuth } from '../../../../hooks/useAuth';
import ErrorText from '../../../../components/ErrorText/ErrorText';
import React, { Suspense, useMemo } from 'react';
import { useGetCharacterQuests } from '../../../../api/characters/useGetCharacterQuests';
import ContentSection from '../../../../components/ContentSection/ContentSection';
import { PbModuleType } from '../../../../generated/api-types/data-contracts';
import { useCharacter } from '../../../../hooks/useCharacter';
import { ModuleAdminRole, useMyModuleRole } from '../../../../hooks/useModuleAdmins';
import LeftNavbar from '../../../../components/LeftNavbar/LeftNavbar';
import Layout from '../../../../components/Layout/Layout';
import ActionBoxModule from '../../../modules/ActionBox/ActionBoxModule';
import DetailCharacterRightSection from '../DetailCharacterRightSection/DetailCharacterRightSection';
import { Col, Flex, Row } from '../../../../components/Flex/Flex';
import { DetailCharacterPage } from '../detailCharacterLib';
import { useGetQuests } from '../../../../api/quests/useGetQuests';
import InfiniteScrollObserver from '../../../../components/InfiniteScrollObserver/InfiniteScrollObserver';
import QuestCard from '../../../../components/QuestCard/QuestCard';
import LoadingText from '../../../../components/Loading/LoadingText';
import LayoutToggleGroup from '../../../../components/LayoutToggleGroup/LayoutToggleGroup';
import QuestRow from '../../../../components/QuestRow/QuestRow';
import { useModuleListLayout } from '../../../../store/lib/ModuleListLayout/useModuleListLayout';

interface AvailableCharacterQuestsProps {
  characterId: number;
}

const AvailableCharacterQuests: React.FC<AvailableCharacterQuestsProps> = ({ characterId }) => {
  const { character, moduleId } = useCharacter(characterId);
  const { user } = useAuth();
  const {
    data: characterQuests = [],
    isPending: applicationsPending,
    error: applicationsError,
  } = useGetCharacterQuests({ variables: { id: characterId, viewerId: user?.id ?? 0 } });
  const [layout] = useModuleListLayout(PbModuleType.MODULE_TYPE_QUEST);
  const { role } = useMyModuleRole(moduleId);

  const {
    data: questData,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useGetQuests({
    enabled: !!character?.worldId && !!character?.systemId,
    variables: {
      systemId: character?.systemId ?? 0,
      worldId: character?.worldId ?? 0,
      canJoin: true,
    },
  });

  const totalCount = questData?.pages[0]?.totalCount ?? 0;

  const headerActions = useMemo(
    () => <LayoutToggleGroup moduleType={PbModuleType.MODULE_TYPE_QUEST} />,
    [],
  );

  return (
    <Layout vertical={true} navbar={<LeftNavbar />}>
      <ActionBoxModule moduleId={moduleId} />
      <Row gap="md" alignItems="start" wrap>
        <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
          <ContentSection
            flexWrap="wrap"
            direction="column"
            header="Available quests"
            headerActions={headerActions}
          >
            <ErrorText error={error ?? applicationsError} />
            <Flex
              direction={layout === 'rowLayout' ? 'column' : 'row'}
              gap="md"
              alignItems={layout === 'rowLayout' ? undefined : 'start'}
              wrap={layout !== 'rowLayout'}
              fullWidth={layout === 'rowLayout'}
            >
              {totalCount === 0 &&
                !isFetching &&
                !error &&
                !!character &&
                'No quests available in this World and System combination.'}
              {isFetching && <LoadingText />}
              {questData?.pages.map((page) =>
                page.questIds?.map((questId) => (
                  <Suspense fallback={null} key={questId}>
                    <Col
                      gap="sm"
                      fullWidth={layout === 'rowLayout'}
                      css={
                        layout === 'gridLayout' ? { width: '20rem', maxWidth: '100%' } : undefined
                      }
                    >
                      {layout === 'rowLayout' ? (
                        <QuestRow questId={questId} />
                      ) : (
                        <QuestCard questId={questId} />
                      )}
                      {!applicationsPending && !applicationsError && (
                        <QuestApplication
                          questId={questId}
                          characterId={characterId}
                          application={characterQuests.find((item) => item.questId === questId)}
                          canManage={role === ModuleAdminRole.SUPER_COLLABORATOR}
                          canApply
                        />
                      )}
                    </Col>
                  </Suspense>
                )),
              )}
              {hasNextPage && !isFetching && (
                <InfiniteScrollObserver runOnObserve={fetchNextPage} />
              )}
            </Flex>
          </ContentSection>
        </Col>
        <DetailCharacterRightSection
          characterId={characterId}
          subpage={DetailCharacterPage.AVAILABLE_QUESTS}
        />
      </Row>
    </Layout>
  );
};

export default AvailableCharacterQuests;
