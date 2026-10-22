import React, { useCallback } from 'react';
import { LexicalEditor, FORMAT_TEXT_COMMAND } from 'lexical';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { BsCode, BsLink, BsTypeStrikethrough } from 'react-icons/bs';
import { DropdownMenuTrigger } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuTrigger';
import { DropdownMenuPortal } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuPortal';
import { DropdownMenuContent } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuContent';
import { DropdownMenuCheckboxItem } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuCheckboxItem';
import { DropdownMenuItemIndicator } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuItemIndicator';
import { DropdownMenuRoot } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuRoot';

interface ToolbarDropdownFormattingTextProps {
  trigger: React.ReactNode;
  editor: LexicalEditor;

  isStrikethrough: boolean;
  isCode: boolean;
  isLink: boolean;
}

const ToolbarDropdownFormattingText = ({
  trigger,
  editor,
  isStrikethrough,
  isCode,
  isLink,
}: ToolbarDropdownFormattingTextProps): JSX.Element => {
  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const strikethroughTextCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
  }, [editor]);

  const codeTextCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
  }, [editor]);

  return (
    <DropdownMenuRoot modal={false}>
      <DropdownMenuTrigger noBorder asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            active={isStrikethrough}
            aria-label="Strikethrough"
            checked={true}
            padding="lg"
            onSelect={strikethroughTextCallback}
          >
            <DropdownMenuItemIndicator>
              <BsTypeStrikethrough />
            </DropdownMenuItemIndicator>
            Strikethrough
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            active={isCode}
            aria-label="Code block"
            checked={true}
            padding="lg"
            onSelect={codeTextCallback}
          >
            <DropdownMenuItemIndicator>
              <BsCode />
            </DropdownMenuItemIndicator>
            Code block
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            active={isLink}
            aria-label="Link"
            checked={true}
            padding="lg"
            onSelect={insertLink}
          >
            <DropdownMenuItemIndicator>
              <BsLink />
            </DropdownMenuItemIndicator>
            Link
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  );
};

export default ToolbarDropdownFormattingText;
