import { useGetModuleTypeAvailableTags } from '../../../../api/tags/useGetModuleTypeAvailableTags';
import { PbModuleType, PbViewTag } from '../../../../generated/api-types/data-contracts';
import React, { Suspense } from 'react';
import { useGetSystems } from '../../../../api/systems/useGetSystems';
import { Col, Row } from '../../../../components/Flex/Flex';
import LoadingText from '../../../../components/Loading/LoadingText';
import InfiniteScrollObserver from '../../../../components/InfiniteScrollObserver/InfiniteScrollObserver';
import SystemCard from '../../../../components/SystemCard/SystemCard';
import { TitleH2, TitleH3 } from '../../../../components/Typography/Title';
import TagButtonBox from '../../../../components/TagButtonBox/TagButtonBox';
import Loading from '../../../../components/Loading/Loading';
import ModuleIntroduction from '../../../../screens/modules/ModuleIntroduction/ModuleIntroduction';
import { useSystem } from '../../../../hooks/useSystem';

interface SystemSelectListProps {
  selectedSystemId?: number;
  setSelectedSystemId?: (id: number) => void;
}

const SystemSelectList: React.FC<SystemSelectListProps> = ({
  selectedSystemId,
  setSelectedSystemId,
}) => {
  const { data: tags = [], isPending: isPendingGet } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_SYSTEM,
  });
  const [selectedTags, setSelectedTags] = React.useState<PbViewTag[]>([]);

  const {
    data: systemsData,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useGetSystems({
    variables: {
      tags: selectedTags.map((t) => t.id ?? 0),
    },
  });

  const { system: selectedSystem, module: selectedModule } = useSystem(selectedSystemId ?? 0);

  return (
    <>
      <Row gap="md" alignItems="start" wrap>
        <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
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
            {systemsData?.pages.map(
              (page) =>
                page.systemIds?.map((systemId) => (
                  <Suspense fallback={null} key={systemId}>
                    <SystemCard
                      systemId={systemId}
                      onSystemSelected={setSelectedSystemId}
                      selected={systemId === selectedSystemId}
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
          <TitleH2>{selectedSystem?.name}</TitleH2>
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

export default SystemSelectList;
