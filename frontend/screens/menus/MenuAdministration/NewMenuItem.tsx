import React, { KeyboardEventHandler, useCallback, useEffect } from 'react';
import { Row } from '../../../components/Flex/Flex';
import Input from '../../../components/Input/Input';
import { Button } from '../../../components/Button/Button';
import ErrorText from '../../../components/ErrorText/ErrorText';
import { useInput } from '../../../hooks/useInput';
import { useCreateMenuItem } from '../../../api/menus/useCreateMenuItem';
import { simplifyString } from '../../../utils/functions/simplifyString';
import { Text } from '../../../components/Typography/Text';
import ContentSection from '../../../components/ContentSection/ContentSection';

interface NewMenuItemProps {
  menuId: number;
}

const NewMenuItem: React.FC<NewMenuItemProps> = ({ menuId }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const {
    value: titleValue,
    onChange: onChangeTitle,
    setValue: setTitleValue,
  } = useInput<string>('');

  const { mutate: createMenuItem, isPending, error } = useCreateMenuItem();

  useEffect(() => {
    if (!isPending) {
      inputRef.current?.focus();
    }
  }, [isPending]);

  const handleNewTag = useCallback(() => {
    createMenuItem(
      {
        menuId,
        body: { name: titleValue, code: simplifyString(titleValue), isMain: false },
      },
      {
        onSuccess: () => {
          setTitleValue('');
        },
      },
    );
  }, [createMenuItem, menuId, setTitleValue, titleValue]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        handleNewTag();
      }
    },
    [handleNewTag],
  );

  return (
    <ContentSection flexWrap="wrap" direction="column" header="New menu item">
      <Row gap="md" css={{ width: '300px' }}>
        <Input
          disabled={isPending}
          id="new-menu-item"
          type="text"
          value={titleValue}
          onChange={onChangeTitle}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          displayHelpers={false}
        />
        <Button loading={isPending} onClick={handleNewTag}>
          Add
        </Button>
      </Row>
      <ErrorText error={error} />
      <Text>Item will be added at the end of the menu</Text>
    </ContentSection>
  );
};

export default NewMenuItem;
