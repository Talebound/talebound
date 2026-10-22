import React, { useCallback } from 'react';
import { LexicalEditor, FORMAT_ELEMENT_COMMAND } from 'lexical';
import { BsJustify, BsTextCenter, BsTextLeft, BsTextRight } from 'react-icons/bs';
import { DropdownMenuRoot } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuRoot';
import { DropdownMenuTrigger } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuTrigger';
import { DropdownMenuPortal } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuPortal';
import { DropdownMenuContent } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuContent';
import { DropdownMenuCheckboxItem } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuCheckboxItem';
import { DropdownMenuItemIndicator } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuItemIndicator';

interface ToolbarDropdownAlignTypeProps {
  trigger: React.ReactNode;
  editor: LexicalEditor;
}

const ToolbarDropdownAlignType = ({
  trigger,
  editor,
}: ToolbarDropdownAlignTypeProps): JSX.Element => {
  const leftElementCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
  }, [editor]);

  const centerElementCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
  }, [editor]);

  const rightElementCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
  }, [editor]);

  const justifyElementCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
  }, [editor]);

  return (
    <>
      <DropdownMenuRoot modal={false}>
        <DropdownMenuTrigger noBorder asChild>
          {trigger}
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              aria-label="Left align"
              checked={true}
              padding="lg"
              onSelect={leftElementCallback}
            >
              <DropdownMenuItemIndicator>
                <BsTextLeft />
              </DropdownMenuItemIndicator>
              Left
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              aria-label="Right align"
              checked={true}
              padding="lg"
              onSelect={rightElementCallback}
            >
              <DropdownMenuItemIndicator>
                <BsTextRight />
              </DropdownMenuItemIndicator>
              Right
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              aria-label="Center align"
              checked={true}
              padding="lg"
              onSelect={centerElementCallback}
            >
              <DropdownMenuItemIndicator>
                <BsTextCenter />
              </DropdownMenuItemIndicator>
              Center
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              aria-label="Justify align"
              checked={true}
              padding="lg"
              onSelect={justifyElementCallback}
            >
              <DropdownMenuItemIndicator>
                <BsJustify />
              </DropdownMenuItemIndicator>
              Justify
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>
    </>
  );
};

export default ToolbarDropdownAlignType;
