import React from 'react';
import useLexicalEditable from '@lexical/react/useLexicalEditable';
import { createPortal } from 'react-dom';
import TableCellActionMenuContainer from './TableCellActionMenuContainer';

interface TableCellActionMenuPluginProps {
  anchorElem?: HTMLElement;
  cellMerge?: boolean;
}

const TableCellActionMenuPlugin: React.FC<TableCellActionMenuPluginProps> = ({
  anchorElem = document.body,
  cellMerge = false,
}) => {
  const isEditable = useLexicalEditable();

  return createPortal(
    isEditable ? (
      <TableCellActionMenuContainer anchorElem={anchorElem} cellMerge={cellMerge} />
    ) : null,
    anchorElem,
  );
};

export default TableCellActionMenuPlugin;
