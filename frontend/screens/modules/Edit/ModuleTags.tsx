import React, { useCallback } from 'react';
import { useGetModuleTypeAvailableTags } from '../../../api/tags/useGetModuleTypeAvailableTags';
import { useCreateModuleTag } from '../../../api/tags/useCreateModuleTag';
import { useDeleteModuleTag } from '../../../api/tags/useDeleteModuleTag';
import { Row } from '../../../components/Flex/Flex';
import TagButton from '../../../components/TagButton/TagButton';
import { PbViewTag } from '../../../generated/api-types/data-contracts';
import ErrorText from '../../../components/ErrorText/ErrorText';
import { useModule } from '../../../hooks/useModule';

interface ModuleTagsProps {
  moduleId: number;
  disabled?: boolean;
  tags: number[];
}

const ModuleTags: React.FC<ModuleTagsProps> = ({ moduleId, disabled, tags }) => {
  const { module } = useModule(moduleId);
  const { data: availableTags = [], isPending: isPendingGet } = useGetModuleTypeAvailableTags({
    variables: module?.moduleType,
  });

  const { mutate: createTag, isPending: isPendingAdd, error: errorAdd } = useCreateModuleTag();
  const {
    mutate: deleteTag,
    isPending: isPendingRemove,
    error: errorRemove,
  } = useDeleteModuleTag();

  const onTagSelect = useCallback(
    (tag: PbViewTag) => {
      if (!tag.tag || !tag.id) return;
      if (tag.id && tags.includes(tag.id)) {
        deleteTag({ moduleId, tagId: tag.id });
      } else {
        createTag({ moduleId, tagId: tag.id });
      }
    },
    [createTag, deleteTag, tags, moduleId],
  );

  const isPending = isPendingAdd || isPendingGet || isPendingRemove;

  return (
    <>
      <Row wrap css={{ width: '100%' }} gap="sm">
        {availableTags.map((t) => (
          <TagButton
            disabled={disabled || isPending}
            tag={t}
            key={t.id}
            onSelect={onTagSelect}
            active={tags.includes(t.id ?? 0)}
          />
        ))}
        {availableTags.length === 0 && <p>No tags available</p>}
        <ErrorText error={errorAdd ?? errorRemove} />
      </Row>
    </>
  );
};

export default ModuleTags;
