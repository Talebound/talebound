import React, { Suspense, useCallback } from 'react';
import LeftNavbar from '../../../components/LeftNavbar/LeftNavbar';
import { Col, Row } from '../../../components/Flex/Flex';
import ContentSection from '../../../components/ContentSection/ContentSection';
import Layout from '../../../components/Layout/Layout';
import ActionBoxSystemList from './ActionBoxSystemList';
import { useGetSystems } from '../../../api/systems/useGetSystems';
import SystemCard from '../../../components/SystemCard/SystemCard';
import LoadingText from '../../../components/Loading/LoadingText';
import InfiniteScrollObserver from '../../../components/InfiniteScrollObserver/InfiniteScrollObserver';
import { useGetModuleTypeAvailableTags } from '../../../api/tags/useGetModuleTypeAvailableTags';
import { PbModuleType, PbViewTag } from '../../../generated/api-types/data-contracts';
import TagButtonBox from '../../../components/TagButtonBox/TagButtonBox';
import { TitleH2 } from '../../../components/Typography/Title';
import Checkbox from '../../../components/Checkbox/Checkbox';

const SystemList: React.FC = () => {
  const { data: tags = [], isPending: isPendingGet } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_SYSTEM,
  });
  const [selectedTags, setSelectedTags] = React.useState<PbViewTag[]>([]);
  const [showOnlyPublic, setShowOnlyPublic] = React.useState<boolean>(false);

  const {
    data: systemsData,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useGetSystems({
    variables: {
      public: showOnlyPublic,
      tags: selectedTags.map((t) => t.id ?? 0),
    },
  });

  const onChangeShowOnlyPublic = useCallback((value: boolean) => {
    setShowOnlyPublic(value);
  }, []);

  return (
    <>
      <ActionBoxSystemList />
      <Layout vertical={true} navbar={<LeftNavbar />}>
        <Row gap="md" alignItems="start" wrap>
          <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
            <ContentSection loading={isPendingGet} flexWrap="wrap" direction="column">
              <Row gap="md" fullWidth justifyContent="between">
                <TitleH2>Filters</TitleH2>
                <Row>
                  <Checkbox
                    id="show-only-public"
                    defaultChecked={showOnlyPublic}
                    onCheckedChange={onChangeShowOnlyPublic}
                  >
                    Show only public
                  </Checkbox>
                </Row>
              </Row>
              <TagButtonBox
                tags={tags}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                displayCount={true}
                showZeroCountToggle={true}
              />
            </ContentSection>

            <Row gap="md" alignItems="start" wrap>
              {systemsData?.pages.map(
                (page) =>
                  page.systemIds?.map((systemId) => (
                    <Suspense fallback={null} key={systemId}>
                      <SystemCard systemId={systemId} />
                    </Suspense>
                  )),
              )}
              {hasNextPage && !isFetching && (
                <InfiniteScrollObserver runOnObserve={fetchNextPage} />
              )}
            </Row>
            {isFetching && <LoadingText />}
          </Col>

          <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
            <ContentSection direction="column" header="Systems">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Lobortis mattis aliquam faucibus purus
                in massa tempor. Aliquam ultrices sagittis orci a scelerisque purus semper eget
                duis. Morbi enim nunc faucibus a pellentesque sit amet. Pulvinar mattis nunc sed
                blandit libero volutpat sed cras ornare. Metus dictum at tempor commodo ullamcorper
                a lacus vestibulum. Egestas erat imperdiet sed euismod nisi porta lorem mollis
                aliquam. Amet tellus cras adipiscing enim. Dis parturient montes nascetur ridiculus
                mus. Faucibus turpis in eu mi bibendum neque egestas. Aliquet eget sit amet tellus
                cras adipiscing enim eu. Sagittis id consectetur purus ut faucibus pulvinar
                elementum integer enim. Lorem ipsum dolor sit amet consectetur adipiscing.
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus consequat enim
                a dignissim. Suspendisse convallis, est tempus euismod laoreet, justo ligula gravida
                ipsum, nec pulvinar leo justo a tellus. Aenean sodales augue non semper viverra.
              </p>

              <p>
                Integer volutpat est libero, vel condimentum eros scelerisque ac. Phasellus sodales
                a est id aliquam. Curabitur nec lobortis erat. Vivamus ullamcorper ipsum ac orci
                varius, in vehicula diam fermentum. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </p>

              <p>
                In venenatis pretium enim, ut aliquet magna. Suspendisse suscipit iaculis vehicula.
                Fusce ac orci ut mauris facilisis sagittis id in urna. Phasellus ut commodo orci.
                Vivamus non nisl est. Mauris lacinia tincidunt mi, eu mollis tortor.
              </p>
            </ContentSection>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default SystemList;
