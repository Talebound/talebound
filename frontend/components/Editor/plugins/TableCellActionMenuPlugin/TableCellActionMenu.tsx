import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  $deleteTableColumnAtSelection,
  $deleteTableRowAtSelection,
  $getTableColumnIndexFromTableCellNode,
  $getTableNodeFromLexicalNodeOrThrow,
  $getTableRowIndexFromTableCellNode,
  $insertTableColumnAtSelection,
  $insertTableRowAtSelection,
  $isTableCellNode,
  $isTableRowNode,
  $unmergeCellNode,
  getTableObserverFromTableElement,
  HTMLTableElementWithWithTableSelectionState,
  TableCellHeaderStates,
  TableCellNode,
  $getNodeTriplet,
  $isTableSelection,
  $mergeCells,
  TableSelection,
} from '@lexical/table';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, $getSelection, $isRangeSelection } from 'lexical';
import { DropdownMenuItem } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuItem';
import { DropdownMenuRoot } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuRoot';
import { DropdownMenuTrigger } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuTrigger';
import { DropdownMenuPortal } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuPortal';
import { DropdownMenuContent } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuContent';
import { DropdownMenuSeparator } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuSeparator';
import {
  $selectLastDescendant,
  computeSelectionCount,
  currentCellBackgroundColor,
  isTableSelectionRectangular,
} from './tableCellActionMenuLib';
import ColorPickerModal from './ColorPickerModal';

interface TableCellActionMenuProps {
  trigger: React.ReactNode;
  contextRef: { current: null | HTMLElement };
  // showColorPickerModal: (title: string, showModal: (onClose: () => void) => React.JSX.Element) => void;
  tableCellNode: TableCellNode;
  cellMerge: boolean;
  onOpenChange: (open: boolean) => void;
}

const TableCellActionMenu: React.FC<TableCellActionMenuProps> = ({
  trigger,
  tableCellNode: _tableCellNode,
  contextRef,
  cellMerge,
  onOpenChange,
  // showColorPickerModal,
}) => {
  const [editor] = useLexicalComposerContext();
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [tableCellNode, updateTableCellNode] = useState(_tableCellNode);
  useEffect(() => {
    updateTableCellNode(_tableCellNode);
  }, [_tableCellNode]);
  const [selectionCounts, updateSelectionCounts] = useState({
    columns: 1,
    rows: 1,
  });
  const mergeSelectionRef = useRef<TableSelection | null>(null);
  const [canMergeCells, setCanMergeCells] = useState(false);
  const [canUnmergeCell, setCanUnmergeCell] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(
    () => currentCellBackgroundColor(editor) || '',
  );
  const [showColorPickerModal, setShowColorPickerModal] = useState(false);

  useEffect(() => {
    return editor.registerMutationListener(TableCellNode, (nodeMutations) => {
      const nodeUpdated = nodeMutations.get(tableCellNode.getKey()) === 'updated';

      if (nodeUpdated) {
        editor.getEditorState().read(() => {
          updateTableCellNode(tableCellNode.getLatest());
        });
        setBackgroundColor(currentCellBackgroundColor(editor) || '');
      }
    });
  }, [editor, tableCellNode]);

  const checkPossibleActions = useCallback(
    (opened: boolean) => {
      onOpenChange(opened);
      if (!opened) return;
      editor.getEditorState().read(() => {
        const selection = $getSelection();

        // Keep the cell selection while focus moves into the dropdown.
        mergeSelectionRef.current = $isTableSelection(selection) ? selection.clone() : null;

        // Merge cells
        if ($isTableSelection(selection)) {
          const currentSelectionCounts = computeSelectionCount(selection);
          updateSelectionCounts(computeSelectionCount(selection));
          setCanMergeCells(
            isTableSelectionRectangular(selection) &&
              (currentSelectionCounts.columns > 1 || currentSelectionCounts.rows > 1),
          );
        } else {
          setCanMergeCells(false);
          updateSelectionCounts({
            columns: 1,
            rows: 1,
          });
        }

        // Unmerge cell
        const cell = tableCellNode.getLatest();
        setCanUnmergeCell(cell.getColSpan() > 1 || cell.getRowSpan() > 1);
      });
    },
    [editor, tableCellNode, onOpenChange],
  );

  useEffect(() => {
    const menuButtonElement = contextRef.current;
    const dropDownElement = dropDownRef.current;
    const rootElement = editor.getRootElement();

    if (menuButtonElement != null && dropDownElement != null && rootElement != null) {
      const rootEleRect = rootElement.getBoundingClientRect();
      const menuButtonRect = menuButtonElement.getBoundingClientRect();
      dropDownElement.style.opacity = '1';
      const dropDownElementRect = dropDownElement.getBoundingClientRect();

      const margin = 5;
      let leftPosition = menuButtonRect.right + margin;
      if (
        leftPosition + dropDownElementRect.width > window.innerWidth ||
        leftPosition + dropDownElementRect.width > rootEleRect.right
      ) {
        const position = menuButtonRect.left - dropDownElementRect.width - margin;
        leftPosition = (position < 0 ? margin : position) + window.scrollX;
      }
      dropDownElement.style.left = `${leftPosition + window.scrollX}px`;

      let topPosition = menuButtonRect.top;
      if (topPosition + dropDownElementRect.height > window.innerHeight) {
        const position = menuButtonRect.bottom - dropDownElementRect.height;
        topPosition = position < 0 ? margin : position;
      }
      dropDownElement.style.top = `${topPosition + +window.scrollY}px`;
    }
  }, [contextRef, dropDownRef, editor]);

  const clearTableSelection = useCallback(() => {
    editor.update(() => {
      if (tableCellNode.isAttached()) {
        const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
        const tableElement = editor.getElementByKey(
          tableNode.getKey(),
        ) as HTMLTableElementWithWithTableSelectionState;

        if (!tableElement) {
          throw new Error('Expected to find tableElement in DOM');
        }

        const tableSelection = getTableObserverFromTableElement(tableElement);
        if (tableSelection !== null) {
          tableSelection.$clearHighlight();
        }

        tableNode.markDirty();
        updateTableCellNode(tableCellNode.getLatest());
      }

      const rootNode = $getRoot();
      rootNode.selectStart();
    });
  }, [editor, tableCellNode]);

  const mergeTableCellsAtSelection = useCallback(() => {
    editor.update(() => {
      const selection = mergeSelectionRef.current;
      if (selection) {
        const mergedCell = $mergeCells(selection.getNodes().filter($isTableCellNode));
        if (mergedCell) $selectLastDescendant(mergedCell);
      }
    });
  }, [editor]);

  const unmergeTableCellsAtSelection = useCallback(() => {
    editor.update(() => {
      $unmergeCellNode(tableCellNode);
    });
  }, [editor, tableCellNode]);

  const insertTableRowAtSelection = useCallback(
    (shouldInsertAfter: boolean) => {
      editor.update(() => {
        for (let i = 0; i < selectionCounts.rows; i++) {
          $insertTableRowAtSelection(shouldInsertAfter);
        }
      });
    },
    [editor, selectionCounts.rows],
  );

  const insertTableColumnAtSelection = useCallback(
    (shouldInsertAfter: boolean) => {
      editor.update(() => {
        for (let i = 0; i < selectionCounts.columns; i++) {
          $insertTableColumnAtSelection(shouldInsertAfter);
        }
      });
    },
    [editor, selectionCounts.columns],
  );

  const deleteTableRowAtSelection = useCallback(() => {
    editor.update(() => {
      $deleteTableRowAtSelection();
    });
  }, [editor]);

  const deleteTableAtSelection = useCallback(() => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
      tableNode.remove();

      clearTableSelection();
    });
  }, [editor, tableCellNode, clearTableSelection]);

  const deleteTableColumnAtSelection = useCallback(() => {
    editor.update(() => {
      $deleteTableColumnAtSelection();
    });
  }, [editor]);

  const toggleTableRowIsHeader = useCallback(() => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);

      const tableRowIndex = $getTableRowIndexFromTableCellNode(tableCellNode);

      const tableRows = tableNode.getChildren();

      if (tableRowIndex >= tableRows.length || tableRowIndex < 0) {
        throw new Error('Expected table cell to be inside of table row.');
      }

      const tableRow = tableRows[tableRowIndex];

      if (!$isTableRowNode(tableRow)) {
        throw new Error('Expected table row');
      }

      tableRow.getChildren().forEach((tableCell) => {
        if (!$isTableCellNode(tableCell)) {
          throw new Error('Expected table cell');
        }

        tableCell.toggleHeaderStyle(TableCellHeaderStates.ROW);
      });

      clearTableSelection();
    });
  }, [editor, tableCellNode, clearTableSelection]);

  const toggleTableColumnIsHeader = useCallback(() => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);

      const tableColumnIndex = $getTableColumnIndexFromTableCellNode(tableCellNode);

      const tableRows = tableNode.getChildren();

      for (let r = 0; r < tableRows.length; r++) {
        const tableRow = tableRows[r];

        if (!$isTableRowNode(tableRow)) {
          throw new Error('Expected table row');
        }

        const tableCells = tableRow.getChildren();

        if (tableColumnIndex >= tableCells.length || tableColumnIndex < 0) {
          throw new Error('Expected table cell to be inside of table row.');
        }

        const tableCell = tableCells[tableColumnIndex];

        if (!$isTableCellNode(tableCell)) {
          throw new Error('Expected table cell');
        }

        tableCell.toggleHeaderStyle(TableCellHeaderStates.COLUMN);
      }

      clearTableSelection();
    });
  }, [editor, tableCellNode, clearTableSelection]);

  const handleCellBackgroundColor = useCallback(
    (value: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection) || $isTableSelection(selection)) {
          const [cell] = $getNodeTriplet(selection.anchor);
          if ($isTableCellNode(cell)) {
            cell.setBackgroundColor(value);
          }
        }
      });
    },
    [editor],
  );

  const mergeCellButton = useMemo(() => {
    if (cellMerge) {
      if (canMergeCells) {
        return (
          <DropdownMenuItem onSelect={mergeTableCellsAtSelection}>Merge cells</DropdownMenuItem>
        );
      } else if (canUnmergeCell) {
        return (
          <DropdownMenuItem onSelect={unmergeTableCellsAtSelection}>Unmerge cells</DropdownMenuItem>
        );
      }
    }
    return null;
  }, [
    canMergeCells,
    canUnmergeCell,
    cellMerge,
    mergeTableCellsAtSelection,
    unmergeTableCellsAtSelection,
  ]);

  const openColorPickerModal = useCallback(() => {
    setShowColorPickerModal(true);
  }, []);

  return (
    <>
      <DropdownMenuRoot modal={false} onOpenChange={checkPossibleActions}>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent side="right" sideOffset={5}>
            {mergeCellButton}
            <DropdownMenuItem onSelect={openColorPickerModal}>Background color</DropdownMenuItem>
            {/*<ColorPicker color={backgroundColor} onChange={handleCellBackgroundColor} />*/}
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => insertTableRowAtSelection(false)}>
              Insert {selectionCounts.rows === 1 ? 'row' : `${selectionCounts.rows} rows`} above
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => insertTableRowAtSelection(true)}>
              Insert {selectionCounts.rows === 1 ? 'row' : `${selectionCounts.rows} rows`} below
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => insertTableColumnAtSelection(false)}>
              Insert{' '}
              {selectionCounts.columns === 1 ? 'column' : `${selectionCounts.columns} columns`} left
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => insertTableColumnAtSelection(true)}>
              Insert{' '}
              {selectionCounts.columns === 1 ? 'column' : `${selectionCounts.columns} columns`}{' '}
              right
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={deleteTableColumnAtSelection}>
              Delete column
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={deleteTableRowAtSelection}>Delete row</DropdownMenuItem>
            <DropdownMenuItem onSelect={deleteTableAtSelection}>Delete table</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={toggleTableRowIsHeader}>
              {(tableCellNode.__headerState & TableCellHeaderStates.ROW) ===
              TableCellHeaderStates.ROW
                ? 'Remove'
                : 'Add'}{' '}
              row header
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={toggleTableColumnIsHeader}>
              {(tableCellNode.__headerState & TableCellHeaderStates.COLUMN) ===
              TableCellHeaderStates.COLUMN
                ? 'Remove'
                : 'Add'}{' '}
              column header
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>
      <ColorPickerModal
        title="Cell background color"
        trigger={null}
        open={showColorPickerModal}
        setOpen={setShowColorPickerModal}
        color={backgroundColor}
        onChange={handleCellBackgroundColor}
      />
    </>
  );
};

export default TableCellActionMenu;
