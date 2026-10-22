import React, { KeyboardEventHandler, useCallback } from 'react';
import { PbViewTag } from '../../../generated/api-types/data-contracts';
import { useInput } from '../../../hooks/useInput';
import { Col, Row } from '../../../components/Flex/Flex';
import TagButton from '../../../components/TagButton/TagButton';
import Input from '../../../components/Input/Input';
import { Button } from '../../../components/Button/Button';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';
import { Text } from '../../../components/Typography/Text';
import ErrorText from '../../../components/ErrorText/ErrorText';
import { useGetModuleEntityAvailableTags } from '../../../api/tags/useGetModuleEntityAvailableTags';
import { useUpdateModuleEntityAvailableTag } from '../../../api/tags/useUpdateModuleEntityAvailableTag';
import { useDeleteModuleEntityAvailableTag } from '../../../api/tags/useDeleteModuleEntityAvailableTag';

interface ModuleEntityTagListProps {
  moduleId: number;
}

const ModuleEntityTagList: React.FC<ModuleEntityTagListProps> = ({ moduleId }) => {
  const { data: tag = [], isPending: isPendingGet } = useGetModuleEntityAvailableTags({
    variables: moduleId,
  });

  const {
    mutate: updateTag,
    isPending: isPendingUpdate,
    error: errorUpdate,
  } = useUpdateModuleEntityAvailableTag();

  const {
    mutate: deleteTag,
    isPending: isPendingDelete,
    error: errorDelete,
  } = useDeleteModuleEntityAvailableTag();

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
          moduleId,
        },
        {
          onSuccess: () => {
            setSelectedTag(undefined);
            setTagValue('');
          },
        },
      );
    }
  }, [moduleId, selectedTag?.id, deleteTag, setTagValue]);

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
    <>
      <Text>
        You can assign these tags to your entities (posts, images, maps,...), so you and other users
        can find them more easily.
      </Text>
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
          {tag.length === 0 && <p>No tags available. Add your first tag below!</p>}
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
              description="Deleting this tag will remove it from all entities that have it assigned."
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
    </>
  );
};

export default ModuleEntityTagList;
