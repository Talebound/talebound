import React, { KeyboardEventHandler, useCallback } from 'react';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { useGetModuleTypeAvailableTags } from '../../../api/tags/useGetModuleTypeAvailableTags';
import { PbModuleType, PbViewTag } from '../../../generated/api-types/data-contracts';
import TagButton from '../../../components/TagButton/TagButton';
import { Col, Row } from '../../../components/Flex/Flex';
import Input from '../../../components/Input/Input';
import { Button } from '../../../components/Button/Button';
import { useInput } from '../../../hooks/useInput';
import { useUpdateModuleTypeAvailableTag } from '../../../api/tags/useUpdateModuleTypeAvailableTag';
import ErrorText from '../../../components/ErrorText/ErrorText';
import { useDeleteModuleTypeAvailableTag } from '../../../api/tags/useDeleteModuleTypeAvailableTag';
import { Text } from '../../../components/Typography/Text';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';
import { moduleTypeTitles } from '../../../utils/modulesAndEntities';

interface SectionAvailableModuleTagsProps {
  moduleType: PbModuleType;
}

const SectionAvailableModuleTags: React.FC<SectionAvailableModuleTagsProps> = ({ moduleType }) => {
  const { data: tag = [], isPending: isPendingGet } = useGetModuleTypeAvailableTags({
    variables: moduleType,
  });

  const {
    mutate: updateTag,
    isPending: isPendingUpdate,
    error: errorUpdate,
  } = useUpdateModuleTypeAvailableTag();

  const {
    mutate: deleteTag,
    isPending: isPendingDelete,
    error: errorDelete,
  } = useDeleteModuleTypeAvailableTag();

  const [selectedTag, setSelectedTag] = React.useState<PbViewTag>();
  const { value: tagValue, onChange: onChangeTag, setValue: setTagValue } = useInput<string>('');

  const isPending = isPendingUpdate || isPendingGet || isPendingDelete;

  const handleNewTag = useCallback(() => {
    const tagId = selectedTag?.id;
    if (tagId) {
      updateTag(
        {
          tagId,
          newTag: tagValue,
        },
        {
          onSuccess: () => {
            setSelectedTag(undefined);
            setTagValue('');
          },
        },
      );
    }
  }, [selectedTag?.id, updateTag, tagValue, setTagValue]);

  const handleDeleteTag = useCallback(() => {
    const tagId = selectedTag?.id;
    if (tagId) {
      deleteTag(
        {
          tagId,
          moduleType,
        },
        {
          onSuccess: () => {
            setSelectedTag(undefined);
            setTagValue('');
          },
        },
      );
    }
  }, [moduleType, selectedTag?.id, deleteTag, setTagValue]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        handleNewTag();
      }
    },
    [handleNewTag],
  );

  const onTagSelect = useCallback(
    (tag: PbViewTag) => {
      setSelectedTag(tag);
      setTagValue(tag.tag ?? '');
    },
    [setTagValue],
  );

  return (
    <ContentSection
      flexWrap="wrap"
      direction="column"
      header={`Tag administration - ${moduleTypeTitles[moduleType]}s`}
    >
      <Row alignItems="start" wrap css={{ width: '100%' }} gap="sm">
        <Row wrap css={{ width: 'max(calc(100% - 400px), 300px)' }} gap="sm">
          {tag.map((t) => (
            <TagButton
              tag={t}
              key={t.id}
              onSelect={onTagSelect}
              active={t.id === selectedTag?.id}
            />
          ))}
          {tag.length === 0 && <p>No tags available</p>}
        </Row>
        <Col gap="md" css={{ width: '300px' }}>
          <Row gap="md">
            <Input
              disabled={!selectedTag}
              id={'update-tag'}
              type={'text'}
              value={tagValue}
              onChange={onChangeTag}
              onKeyDown={handleKeyDown}
              displayHelpers={false}
            />
            <Button disabled={!selectedTag} loading={isPending} onClick={handleNewTag}>
              Update
            </Button>
            <AlertDialog
              triggerButtonDisabled={!selectedTag}
              triggerButtonLoading={isPending}
              triggerButtonText="Delete"
              title={`Delete tag "${selectedTag?.tag}"`}
              description="Deleting this tag will remove it from all worlds, that have it assigned."
              dangerButtonText="Delete"
              submitAction={handleDeleteTag}
            />
          </Row>
          <Text size="sm" i>
            (Select a tag to perform action)
          </Text>
          <ErrorText error={errorUpdate ?? errorDelete} />
        </Col>
      </Row>
    </ContentSection>
  );
};

export default SectionAvailableModuleTags;
