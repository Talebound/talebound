import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { TableCellActionButton, TableCellActionButtonContainer } from './componentsTableActionMenu';
import { BiChevronDown } from 'react-icons/bi';
import TableCellActionMenu from './TableCellActionMenu';
import { $getTableCellNodeFromLexicalNode, $isTableSelection, TableCellNode } from '@lexical/table';

interface TableCellActionMenuContainerProps {
  anchorElem: HTMLElement;
  cellMerge: boolean;
}

const TableCellActionMenuContainer: React.FC<TableCellActionMenuContainerProps> = ({
  anchorElem,
  cellMerge,
}) => {
  const [editor] = useLexicalComposerContext();

  const menuButtonRef = useRef<HTMLDivElement>(null);
  const menuRootRef = useRef<HTMLButtonElement>(null);
  const menuOpenRef = useRef(false);

  const [tableCellNode, setTableMenuCellNode] = useState<TableCellNode | null>(null);

  const moveMenu = useCallback(() => {
    // Lexical may clear its selection when keyboard focus enters the menu.
    if (menuOpenRef.current) return;
    const menu = menuButtonRef.current;
    const selection = $getSelection();
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;

    if (selection == null || menu == null) {
      setTableMenuCellNode(null);
      return;
    }

    const rootElement = editor.getRootElement();

    if (
      $isTableSelection(selection) ||
      ($isRangeSelection(selection) &&
        rootElement !== null &&
        nativeSelection !== null &&
        rootElement.contains(nativeSelection.anchorNode))
    ) {
      const tableCellNodeFromSelection = $getTableCellNodeFromLexicalNode(
        selection.anchor.getNode(),
      );

      if (tableCellNodeFromSelection == null) {
        setTableMenuCellNode(null);
        return;
      }

      const tableCellParentNodeDOM = editor.getElementByKey(tableCellNodeFromSelection.getKey());

      if (tableCellParentNodeDOM == null) {
        setTableMenuCellNode(null);
        return;
      }

      setTableMenuCellNode(tableCellNodeFromSelection);
    } else if (!activeElement) {
      setTableMenuCellNode(null);
    }
  }, [editor]);

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.getEditorState().read(() => {
        moveMenu();
      });
    });
  });

  useEffect(() => {
    const menuButtonDOM = menuButtonRef.current as HTMLButtonElement | null;

    if (menuButtonDOM != null && tableCellNode != null) {
      const tableCellNodeDOM = editor.getElementByKey(tableCellNode.getKey());

      if (tableCellNodeDOM != null) {
        const tableCellRect = tableCellNodeDOM.getBoundingClientRect();
        const menuRect = menuButtonDOM.getBoundingClientRect();
        const anchorRect = anchorElem.getBoundingClientRect();

        const top = tableCellRect.top - anchorRect.top + 4;
        const left = tableCellRect.right - menuRect.width - 10 - anchorRect.left;

        menuButtonDOM.style.opacity = '1';
        menuButtonDOM.style.transform = `translate(${left}px, ${top}px)`;
      } else {
        menuButtonDOM.style.opacity = '0';
        menuButtonDOM.style.transform = 'translate(-10000px, -10000px)';
      }
    }
  }, [menuButtonRef, tableCellNode, editor, anchorElem]);

  const prevTableCellDOM = useRef(tableCellNode);

  useEffect(() => {
    prevTableCellDOM.current = tableCellNode;
  }, [prevTableCellDOM, tableCellNode]);

  return (
    <TableCellActionButtonContainer ref={menuButtonRef}>
      {tableCellNode != null && (
        <TableCellActionMenu
          onOpenChange={(open) => {
            menuOpenRef.current = open;
          }}
          trigger={
            <TableCellActionButton aria-label="Table cell actions" ref={menuRootRef}>
              <BiChevronDown />
            </TableCellActionButton>
          }
          contextRef={menuRootRef}
          tableCellNode={tableCellNode}
          cellMerge={cellMerge}
        />
      )}
    </TableCellActionButtonContainer>
  );
};

export default TableCellActionMenuContainer;
