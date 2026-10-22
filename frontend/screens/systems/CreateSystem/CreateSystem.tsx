import React, { useCallback, useMemo } from 'react';
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
import { useCreateSystem } from '../../../api/systems/useCreateSystem';
import ErrorText from '../../../components/ErrorText/ErrorText';
import ArticleSystemCreation from '../../../articles/Systems/ArticleSystemCreation';
import { IMAGE_DEFAULT_SYSTEM_THUMBNAIL } from '../../../utils/images/imageDefaultUrls';
import { useGetModuleTypeAvailableTags } from '../../../api/tags/useGetModuleTypeAvailableTags';
import { PbModuleType } from '../../../generated/api-types/data-contracts';

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

const CreateSystem: React.FC = () => {
  const createSystemMutation = useCreateSystem();
  const { value: nameValue, onChange: onChangeName } = useInput<string>('');
  const { value: basedOnValue, onChange: onChangeBasedOn } = useInput<string>('');
  const { value: shortDescriptionValue, onChange: onChangeShortDescription } = useInput<string>('');
  const { data: availableTags = [] } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_SYSTEM,
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
    console.log('submit: ', nameValue, basedOnValue, shortDescriptionValue);

    createSystemMutation.mutate({
      name: nameValue,
      basedOn: basedOnValue,
      shortDescription: shortDescriptionValue,
    });
  }, [nameValue, basedOnValue, shortDescriptionValue, createSystemMutation]);

  return (
    <Layout vertical={true} navbar={<LeftNavbar />}>
      <Row gap="md" alignItems="start" wrap>
        <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
          <ContentSection flexWrap="wrap" direction="row">
            <Col css={{ width: '400px' }}>
              <TitleH2 marginBottom="md">New system</TitleH2>
              <Input
                id="system-name"
                label="System name"
                type="text"
                onChange={onChangeName}
                required
                fullWidth
                maxLength={64}
                helperText={helperNameMessage.text}
                helperType={helperNameMessage.type}
              />
              <InputDescription>Name of the system.</InputDescription>
              <Flex>
                <Input
                  id="system-based-on"
                  label="Based on"
                  type="text"
                  onChange={onChangeBasedOn}
                  fullWidth
                  maxLength={100}
                  helperText="(up to 100 characters, empty for original system)"
                />
              </Flex>
              <InputDescription>
                If the system is based on some other work, you can provide the name of the original
                work here. Some examples would be:
                <div>
                  <li>
                    - <i>Dungeons & Dragons</i>
                  </li>
                  <li>
                    - <i>Pathfinder</i>
                  </li>
                  <li>
                    - <i>Numenera</i>
                  </li>
                </div>
              </InputDescription>
              <Flex>
                <Input
                  id="system-based-on"
                  label="Short description"
                  type="text"
                  onChange={onChangeShortDescription}
                  fullWidth
                  maxLength={1000}
                  helperText="(up to 1000 characters)"
                />
              </Flex>
              <InputDescription>
                Will be displayed when viewing just basic information about the system. Maybe some
                introduction, style, setting, etc. Great to provide if it is your own system, but
                not necessary.
              </InputDescription>
            </Col>
            <Col alignSelf="stretch" css={{ flexGrow: 1, flexBasis: '25rem' }}>
              <Col gap="md" alignItems="center">
                <TitleH2 marginBottom="md">System preview</TitleH2>
                <ImageCard
                  title={nameValue ?? 'System name'}
                  basedOn={basedOnValue}
                  statSections={[]}
                  imgSrc={IMAGE_DEFAULT_SYSTEM_THUMBNAIL}
                  availableTags={availableTags}
                  tags={[]}
                  href="#"
                />
                <Text i size="sm">
                  Note: You will be able to change image and tags later.
                </Text>
                <Button
                  loading={createSystemMutation.isPending}
                  disabled={buttonDisabled}
                  size="xl"
                  color="primaryFill"
                  onClick={onSubmit}
                >
                  Create system
                  <LuGlobe2 />
                </Button>
                <ErrorText error={createSystemMutation.error} />
              </Col>
            </Col>
          </ContentSection>
        </Col>

        <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
          <ArticleSystemCreation />
        </Col>
      </Row>
    </Layout>
  );
};

export default CreateSystem;
