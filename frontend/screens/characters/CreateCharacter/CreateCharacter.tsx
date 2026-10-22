import React, { Suspense, useCallback, useMemo, useState } from 'react';
import Layout from '../../../components/Layout/Layout';
import LeftNavbar from '../../../components/LeftNavbar/LeftNavbar';
import { Col, Flex, Row } from '../../../components/Flex/Flex';
import Input from '../../../components/Input/Input';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { useInput } from '../../../hooks/useInput';
import { HelperMessage, HelperType } from '../../../utils/form/helperTypes';
import { validateString } from '../../../utils/form/validatePassword';
import ImageCard from '../../../components/ImageCard/ImageCard';
import { TitleH2 } from '../../../components/Typography/Title';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/Button/Button';
import { LuGlobe2 } from 'react-icons/lu';
import { useCreateCharacter } from '../../../api/characters/useCreateCharacter';
import ErrorText from '../../../components/ErrorText/ErrorText';
import ArticleCharacterCreation from '../../../articles/Characters/ArticleCharacterCreation';
import { IMAGE_DEFAULT_CHARACTER_THUMBNAIL } from '../../../utils/images/imageDefaultUrls';
import { useGetModuleTypeAvailableTags } from '../../../api/tags/useGetModuleTypeAvailableTags';
import { PbModuleType } from '../../../generated/api-types/data-contracts';
import ModuleSelectModal from '../../../component-sections/Module/ModuleSelectModal/ModuleSelectModal';
import WorldCard from '../../../components/WorldCard/WorldCard';
import SystemCard from '../../../components/SystemCard/SystemCard';
import { getCharacterStatSections } from '../../../components/CharacterCard/CharacterCard';
import LoadingText from '../../../components/Loading/LoadingText';

const CreateCharacter: React.FC = () => {
  const createCharacterMutation = useCreateCharacter();
  const [worldSelectorOpen, setWorldSelectorOpen] = useState(false);
  const [systemSelectorOpen, setSystemSelectorOpen] = useState(false);
  const [selectedWorldId, setSelectedWorldId] = useState(1);
  const [selectedSystemId, setSelectedSystemId] = useState(1);

  const { value: nameValue, onChange: onChangeName } = useInput<string>('');
  const { value: shortDescriptionValue, onChange: onChangeShortDescription } = useInput<string>('');
  const { data: availableTags = [] } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_CHARACTER,
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

    createCharacterMutation.mutate({
      name: nameValue,
      shortDescription: shortDescriptionValue,
      worldId: selectedWorldId,
      systemId: selectedSystemId,
    });
  }, [
    nameValue,
    shortDescriptionValue,
    createCharacterMutation,
    selectedWorldId,
    selectedSystemId,
  ]);

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
              <TitleH2 marginBottom="md">New character</TitleH2>
              <Input
                id="character-name"
                label="Character name"
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
                  id="character-based-on"
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
                <TitleH2 marginBottom="md">Character preview</TitleH2>
                <ImageCard
                  title={nameValue ?? 'Character name'}
                  basedOn=""
                  statSections={getCharacterStatSections(0, 0)}
                  imgSrc={IMAGE_DEFAULT_CHARACTER_THUMBNAIL}
                  availableTags={availableTags}
                  tags={[]}
                  href="#"
                />
                <Text i size="sm">
                  Note: You will be able to change image and tags later.
                </Text>
                <Button
                  loading={createCharacterMutation.isPending}
                  disabled={buttonDisabled}
                  size="xl"
                  color="primaryFill"
                  onClick={onSubmit}
                >
                  Create character
                  <LuGlobe2 />
                </Button>
                <ErrorText error={createCharacterMutation.error} />
              </Col>
            </Col>
          </ContentSection>
        </Col>

        <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
          <ArticleCharacterCreation />
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

export default CreateCharacter;
