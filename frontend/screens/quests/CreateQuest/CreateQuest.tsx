import React, { Suspense, useCallback, useMemo, useState } from 'react';
import Layout from '../../../components/Layout/Layout';
import LeftNavbar from '../../../components/LeftNavbar/LeftNavbar';
import { Col, Flex, Row } from '../../../components/Flex/Flex';
import Input from '../../../components/Input/Input';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { useInput } from '../../../hooks/useInput';
import { HelperMessage, HelperType } from '../../../utils/form/helperTypes';
import { validateString } from '../../../utils/form/validatePassword';
import { styled } from '../../../styles/stitches.config';
import ImageCard from '../../../components/ImageCard/ImageCard';
import { TitleH2 } from '../../../components/Typography/Title';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/Button/Button';
import { LuGlobe2 } from 'react-icons/lu';
import { useCreateQuest } from '../../../api/quests/useCreateQuest';
import ErrorText from '../../../components/ErrorText/ErrorText';
import ArticleQuestCreation from '../../../articles/Quests/ArticleQuestCreation';
import { IMAGE_DEFAULT_QUEST_THUMBNAIL } from '../../../utils/images/imageDefaultUrls';
import { useGetModuleTypeAvailableTags } from '../../../api/tags/useGetModuleTypeAvailableTags';
import { PbModuleType } from '../../../generated/api-types/data-contracts';
import ModuleSelectModal from '../../../component-sections/Module/ModuleSelectModal/ModuleSelectModal';
import WorldCard from '../../../components/WorldCard/WorldCard';
import SystemCard from '../../../components/SystemCard/SystemCard';
import { getQuestStatSections } from '../../../components/QuestCard/QuestCard';
import LoadingText from '../../../components/Loading/LoadingText';

const InputDescription = styled('div', {
  borderRadius: '$md',
  padding: '$md',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '$sm',

  'div li': {
    listStyleType: 'none',
    paddingLeft: '$md',
  },
});

const CreateQuest: React.FC = () => {
  const createQuestMutation = useCreateQuest();
  const [worldSelectorOpen, setWorldSelectorOpen] = useState(false);
  const [systemSelectorOpen, setSystemSelectorOpen] = useState(false);
  const [selectedWorldId, setSelectedWorldId] = useState(1);
  const [selectedSystemId, setSelectedSystemId] = useState(1);

  const { value: nameValue, onChange: onChangeName } = useInput<string>('');
  const { value: shortDescriptionValue, onChange: onChangeShortDescription } = useInput<string>('');
  const { data: availableTags = [] } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_QUEST,
  });

  const helperNameMessage: HelperMessage = useMemo(
    () => validateString(nameValue, 3, 64),
    [nameValue],
  );

  const buttonDisabled = useMemo(
    () => helperNameMessage.type === HelperType.Danger,
    [helperNameMessage.type],
  );

  const onSubmit = useCallback(() => {
    console.log('submit: ', nameValue, shortDescriptionValue);

    createQuestMutation.mutate({
      name: nameValue,
      shortDescription: shortDescriptionValue,
      worldId: selectedWorldId,
      systemId: selectedSystemId,
    });
  }, [nameValue, shortDescriptionValue, createQuestMutation, selectedWorldId, selectedSystemId]);

  const openWorldSelector = useCallback(() => setWorldSelectorOpen(true), [setWorldSelectorOpen]);
  const openSystemSelector = useCallback(
    () => setSystemSelectorOpen(true),
    [setSystemSelectorOpen],
  );

  return (
    <Layout vertical={true} navbar={<LeftNavbar />}>
      <Row gap="md" alignItems="start" wrap>
        <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
          <ContentSection flexWrap="wrap" direction="row">
            <Col css={{ width: '400px' }}>
              <TitleH2 marginBottom="md">New quest</TitleH2>
              <Input
                id="quest-name"
                label="Quest name"
                type="text"
                onChange={onChangeName}
                required
                fullWidth
                maxLength={64}
                helperText={helperNameMessage.text}
                helperType={helperNameMessage.type}
              />
              <Flex>
                <Input
                  id="quest-based-on"
                  label="Short description"
                  type="text"
                  onChange={onChangeShortDescription}
                  fullWidth
                  maxLength={1000}
                  helperText="(up to 1000 characters)"
                />
              </Flex>
              <Row gap="md" wrap>
                <Suspense fallback={<LoadingText />}>
                  <WorldCard worldId={selectedWorldId} onClick={openWorldSelector} compact />
                  <SystemCard systemId={selectedSystemId} onClick={openSystemSelector} compact />
                </Suspense>
              </Row>
            </Col>
            <Col alignSelf="stretch" css={{ flexGrow: 1, flexBasis: '25rem' }}>
              <Col gap="md" alignItems="center">
                <TitleH2 marginBottom="md">Quest preview</TitleH2>
                <ImageCard
                  title={nameValue ?? 'Quest name'}
                  basedOn=""
                  statSections={getQuestStatSections(0, 0)}
                  imgSrc={IMAGE_DEFAULT_QUEST_THUMBNAIL}
                  availableTags={availableTags}
                  tags={[]}
                  href="#"
                />
                <Text i size="sm">
                  Note: You will be able to change image and tags later.
                </Text>
                <Button
                  loading={createQuestMutation.isPending}
                  disabled={buttonDisabled}
                  size="xl"
                  color="primaryFill"
                  onClick={onSubmit}
                >
                  Create quest
                  <LuGlobe2 />
                </Button>
                <ErrorText error={createQuestMutation.error} />
              </Col>
            </Col>
          </ContentSection>
        </Col>

        <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
          <ArticleQuestCreation />
        </Col>
      </Row>
      <ModuleSelectModal
        moduleType={PbModuleType.MODULE_TYPE_WORLD}
        moduleTypeId={selectedWorldId}
        setModuleTypeId={setSelectedWorldId}
        open={worldSelectorOpen}
        setOpen={setWorldSelectorOpen}
      />
      <ModuleSelectModal
        moduleType={PbModuleType.MODULE_TYPE_SYSTEM}
        moduleTypeId={selectedSystemId}
        setModuleTypeId={setSelectedSystemId}
        open={systemSelectorOpen}
        setOpen={setSystemSelectorOpen}
      />
    </Layout>
  );
};

export default CreateQuest;
