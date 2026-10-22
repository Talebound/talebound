import React, { KeyboardEventHandler, useCallback, useEffect } from 'react';
import { Row } from '../../../components/Flex/Flex';
import Input from '../../../components/Input/Input';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { Button } from '../../../components/Button/Button';
import { useInput } from '../../../hooks/useInput';
import { useCreateModuleTypeAvailableTag } from '../../../api/tags/useCreateModuleTypeAvailableTag';
import ErrorText from '../../../components/ErrorText/ErrorText';
import { PbModuleType } from '../../../generated/api-types/data-contracts';

interface SectionNewTagProps {
  moduleType: PbModuleType;
}

const SectionNewTag: React.FC<SectionNewTagProps> = ({ moduleType }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { value: tagValue, onChange: onChangeTag, setValue: setTagValue } = useInput<string>('');

  const { mutate: createNewTag, isPending, error } = useCreateModuleTypeAvailableTag();

  useEffect(() => {
    if (!isPending) {
      inputRef.current?.focus();
    }
  }, [isPending]);

  const handleNewTag = useCallback(() => {
    createNewTag(
      {
        moduleType,
        tag: tagValue,
      },
      {
        onSuccess: () => {
          setTagValue('');
        },
      },
    );
  }, [moduleType, createNewTag, setTagValue, tagValue]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        handleNewTag();
      }
    },
    [handleNewTag],
  );

  return (
    <ContentSection flexWrap="wrap" direction="column" header="New tag">
      <Row gap="md" css={{ width: '300px' }}>
        <Input
          disabled={isPending}
          id={'new-tag'}
          type={'text'}
          value={tagValue}
          onChange={onChangeTag}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          displayHelpers={false}
        />
        <Button loading={isPending} onClick={handleNewTag}>
          Add
        </Button>
      </Row>
      <ErrorText error={error} />
    </ContentSection>
  );
};

export default SectionNewTag;
