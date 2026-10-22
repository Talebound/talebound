import { useGetModuleTypeAvailableTags } from '../../../../api/tags/useGetModuleTypeAvailableTags';
import { PbModuleType, PbViewTag } from '../../../../generated/api-types/data-contracts';
import React, { Suspense } from 'react';
import { useGetWorlds } from '../../../../api/worlds/useGetWorlds';
import { Col, Row } from '../../../../components/Flex/Flex';
import LoadingText from '../../../../components/Loading/LoadingText';
import InfiniteScrollObserver from '../../../../components/InfiniteScrollObserver/InfiniteScrollObserver';
import WorldCard from '../../../../components/WorldCard/WorldCard';
import { TitleH2, TitleH3 } from '../../../../components/Typography/Title';
import TagButtonBox from '../../../../components/TagButtonBox/TagButtonBox';
import Loading from '../../../../components/Loading/Loading';
import ModuleIntroduction from '../../../../screens/modules/ModuleIntroduction/ModuleIntroduction';
import { useWorld } from '../../../../hooks/useWorld';

interface WorldSelectListProps {
  selectedWorldId?: number;
  setSelectedWorldId?: (id: number) => void;
}

const WorldSelectList: React.FC<WorldSelectListProps> = ({
  selectedWorldId,
  setSelectedWorldId,
}) => {
  const { data: tags = [], isPending: isPendingGet } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_WORLD,
  });
  const [selectedTags, setSelectedTags] = React.useState<PbViewTag[]>([]);

  const {
    data: worldsData,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useGetWorlds({
    variables: {
      tags: selectedTags.map((t) => t.id ?? 0),
    },
  });

  const { world: selectedWorld, module: selectedModule } = useWorld(selectedWorldId ?? 0);

  return (
    <>
      <Row gap="md" alignItems="start" wrap>
        <Col gap="md" css={{ flexGrow: 5, flexBasis: '10rem' }}>
          <Col loading={isPendingGet} wrap>
            <Row gap="md" fullWidth justifyContent="between">
              <TitleH3>Filters</TitleH3>
            </Row>
            <TagButtonBox
              tags={tags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              displayCount={true}
              showZeroCountToggle={true}
            />
          </Col>

          <Row gap="md" alignItems="start" wrap>
            {worldsData?.pages.map(
              (page) =>
                page.worldIds?.map((worldId) => (
                  <Suspense fallback={null} key={worldId}>
                    <WorldCard
                      worldId={worldId}
                      onWorldSelected={setSelectedWorldId}
                      selected={worldId === selectedWorldId}
                      grow={false}
                      compact
                    />
                  </Suspense>
                )),
            )}
            {hasNextPage && !isFetching && <InfiniteScrollObserver runOnObserve={fetchNextPage} />}
          </Row>
          {isFetching && <LoadingText />}
        </Col>

        <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
          <TitleH2>{selectedWorld?.name}</TitleH2>
          {selectedModule && (
            <Suspense fallback={<Loading />}>
              <ModuleIntroduction moduleId={selectedModule.id!} postViewOnly={false} />
            </Suspense>
          )}
        </Col>
      </Row>
    </>
  );
};

export default WorldSelectList;
