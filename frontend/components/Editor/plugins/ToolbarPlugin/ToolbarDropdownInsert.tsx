import React, { useCallback, useState } from 'react';
import { LexicalEditor } from 'lexical';
import { BsImage, BsTable } from 'react-icons/bs';

import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode';
import { TbSpacingVertical } from 'react-icons/tb';
import { DropdownMenuRoot } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuRoot';
import { DropdownMenuTrigger } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuTrigger';
import { DropdownMenuCheckboxItem } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuCheckboxItem';
import { DropdownMenuItemIndicator } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuItemIndicator';
import { DropdownMenuPortal } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuPortal';
import { DropdownMenuContent } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuContent';
import EditorImageModal from '../../nodes/ImageModal/EditorImageModal';
import TableModal from '../../nodes/TableModal/TableModal';

interface ToolbarDropdownInsertProps {
  trigger: React.ReactNode;
  editor: LexicalEditor;
}

const ToolbarDropdownInsert: React.FC<ToolbarDropdownInsertProps> = ({ trigger, editor }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);

  const insertHorizontalRule = useCallback(() => {
    editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
  }, [editor]);

  const showTableModalCallback = useCallback(() => {
    setShowTableModal(true);
  }, [setShowTableModal]);

  const showImageModalCallback = useCallback(() => {
    setShowImageModal(true);
  }, [setShowImageModal]);

  return (
    <>
      <DropdownMenuRoot modal={false}>
        <DropdownMenuTrigger noBorder asChild>
          {trigger}
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked={true} padding="lg" onSelect={showTableModalCallback}>
              <DropdownMenuItemIndicator>
                <BsTable />
              </DropdownMenuItemIndicator>
              Table
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={true} padding="lg" onSelect={showImageModalCallback}>
              <DropdownMenuItemIndicator>
                <BsImage />
              </DropdownMenuItemIndicator>
              Image
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={true} padding="lg" onSelect={insertHorizontalRule}>
              <DropdownMenuItemIndicator>
                <TbSpacingVertical />
              </DropdownMenuItemIndicator>
              Horizontal line
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>
      <EditorImageModal
        open={showImageModal}
        setOpen={setShowImageModal}
        editor={editor}
        trigger={null}
      />
      <TableModal
        open={showTableModal}
        setOpen={setShowTableModal}
        editor={editor}
        trigger={null}
      />
    </>
  );
};

export default ToolbarDropdownInsert;
