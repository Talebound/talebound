import React, { Suspense, useCallback, useEffect, useMemo } from 'react';
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
import { Button } from '../../../components/Button/Button';
import ErrorText from '../../../components/ErrorText/ErrorText';
import { useUpdateCharacter } from '../../../api/characters/useUpdateCharacter';
import ModuleImages from '../../modules/Edit/ModuleImages';
import ModuleTags from '../../modules/Edit/ModuleTags';
import Loading from '../../../components/Loading/Loading';
import ActionBoxModule from '../../modules/ActionBox/ActionBoxModule';
import { useMyModuleRole, ModuleAdminRole } from '../../../hooks/useModuleAdmins';
import { useGetModuleTypeAvailableTags } from '../../../api/tags/useGetModuleTypeAvailableTags';
import { PbModuleType } from '../../../generated/api-types/data-contracts';
import { Text } from '../../../components/Typography/Text';
import ModuleEntityTagAdministration from '../../../component-sections/Module/ModuleEntityTagAdministration/ModuleEntityTagAdministration';
import { useCharacter } from '../../../hooks/useCharacter';
import { useImage } from '../../../hooks/useImage';

const ModuleIntroduction = React.lazy(
  () => import('../../modules/ModuleIntroduction/ModuleIntroduction'),
);

interface EditCharacterProps {
  characterId: number;
}

const EditCharacter: React.FC<EditCharacterProps> = ({ characterId }) => {
  const { character, module, moduleId } = useCharacter(characterId);
  console.log({ character, module, moduleId });
  const { role } = useMyModuleRole(moduleId);
  const updateCharacterMutation = useUpdateCharacter();
  const disabled = useMemo(() => role !== ModuleAdminRole.SUPER_COLLABORATOR, [role]);

  const { value: nameValue, onChange: onChangeName, setValue: setNameValue } = useInput<string>('');
  const { data: availableTags = [] } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_CHARACTER,
  });

  const { image: thumbnailImg } = useImage(module?.thumbnailImgId ?? 0);

  const {
    value: shortDescriptionValue,
    onChange: onChangeShortDescription,
    setValue: setShortDescriptionValue,
  } = useInput<string>('');

  useEffect(() => {
    setNameValue(character?.name ?? '');
  }, [setNameValue, character?.name]);

  useEffect(() => {
    setShortDescriptionValue(character?.shortDescription ?? '');
  }, [setShortDescriptionValue, character?.shortDescription]);

  const helperNameMessage: HelperMessage = useMemo(
    () => validateString(nameValue, 3, 64),
    [nameValue],
  );

  const buttonDisabled = useMemo(
    () => helperNameMessage.type === HelperType.Danger,
    [helperNameMessage.type],
  );

  const onSubmit = useCallback(() => {
    updateCharacterMutation.mutate({
      characterId: characterId,
      body: {
        name: nameValue,
        shortDescription: shortDescriptionValue,
      },
    });
  }, [nameValue, shortDescriptionValue, updateCharacterMutation, characterId]);

  const tags = useMemo(() => module?.tags ?? [], [module?.tags]);

  return (
    <>
      <Layout vertical={true} navbar={<LeftNavbar />}>
        <Row gap="md" alignItems="start" wrap>
          <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
            <ContentSection flexWrap="wrap" direction="column">
              <Row fullWidth gap="md" justifyContent="between">
                <Col css={{ width: '400px' }}>
                  <TitleH2 marginBottom="md">Edit character</TitleH2>
                  <Input
                    disabled={disabled}
                    id="character-name"
                    label="Character name"
                    type="text"
                    value={nameValue}
                    onChange={onChangeName}
                    required
                    fullWidth
                    maxLength={64}
                    helperText={helperNameMessage.text}
                    helperType={helperNameMessage.type}
                  />
                  <Flex>
                    <Input
                      disabled={disabled}
                      id="character-based-on"
                      label="Short description"
                      type="text"
                      value={shortDescriptionValue}
                      onChange={onChangeShortDescription}
                      fullWidth
                      maxLength={1000}
                      helperText="(up to 1000 characters)"
                    />
                  </Flex>
                  <Button
                    loading={updateCharacterMutation.isPending}
                    disabled={disabled || buttonDisabled}
                    size="md"
                    color="primaryFill"
                    onClick={onSubmit}
                  >
                    Update character
                  </Button>
                  <Suspense fallback={<Loading />}>
                    <ModuleImages moduleId={moduleId} disabled={disabled} />
                  </Suspense>
                </Col>
                <Col alignSelf="stretch" css={{ flexGrow: 1, flexBasis: '25rem' }}>
                  <Col gap="md" alignItems="center">
                    <TitleH2 marginBottom="md">Character preview</TitleH2>
                    <Suspense fallback={<Loading />}>
                      <ImageCard
                        title={nameValue ?? 'Character name'}
                        basedOn={''}
                        statSections={[]}
                        imgSrc={
                          thumbnailImg?.url ??
                          'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/766aced8-ab7c-4288-5b83-6339c21e0800/600x400'
                        }
                        href="#"
                        availableTags={availableTags}
                        tags={tags}
                      />
                    </Suspense>
                    <ErrorText error={updateCharacterMutation.error} />
                  </Col>
                </Col>{' '}
              </Row>
            </ContentSection>
            {moduleId > 0 && (
              <>
                <ContentSection flexWrap="wrap" direction="column" header="Tags">
                  <Text>
                    Select tags that describe your character. This will make it easier for other
                    users to find it.
                  </Text>
                  {module && <ModuleTags moduleId={moduleId} tags={tags} disabled={disabled} />}
                </ContentSection>
                <ContentSection
                  flexWrap="wrap"
                  direction="column"
                  header="Entity tag administration"
                >
                  <ModuleEntityTagAdministration moduleId={moduleId} />
                </ContentSection>
              </>
            )}
          </Col>

          <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
            <ContentSection direction="column" header="Introduction">
              <Suspense fallback={<Loading />}>
                <ModuleIntroduction moduleId={moduleId} postViewOnly={false} />
              </Suspense>
            </ContentSection>
          </Col>
        </Row>
      </Layout>
      <ActionBoxModule moduleId={moduleId} activeButton="edit" />
    </>
  );
};

export default EditCharacter;
