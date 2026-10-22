import React, { useCallback } from 'react';
import { LexicalEditor } from 'lexical';
import { Col, Row } from '../../../Flex/Flex';
import Input from '../../../Input/Input';
import { useInput } from '../../../../hooks/useInput';
import { Button } from '../../../Button/Button';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import { HelperType } from '../../../../utils/form/helperTypes';

export interface TableModalContentProps {
  editor: LexicalEditor;
  setOpen: (v: boolean) => void;
}

const MAX_COLUMNS = 20;
const MAX_ROWS = 50;

const TableModalContent: React.FC<TableModalContentProps> = ({ editor, setOpen }) => {
  const { value: columns, onChange: onChangeCols } = useInput<number>(5);
  const { value: rows, onChange: onChangeRows } = useInput<number>(5);

  const handleSubmit = useCallback(() => {
    editor.dispatchCommand(INSERT_TABLE_COMMAND, {
      columns: columns.toString(),
      rows: rows.toString(),
    });
    setOpen(false);
  }, [columns, editor, rows, setOpen]);

  return (
    <Col padding="md" gap="sm" css={{ width: '$14xl' }}>
      <Input
        id={'columns'}
        type="number"
        min={1}
        max={MAX_COLUMNS}
        value={columns}
        label={`Columns`}
        onChange={onChangeCols}
        helperText={`(1-${MAX_COLUMNS})`}
        helperType={columns > MAX_COLUMNS || columns < 1 ? HelperType.Danger : undefined}
      />
      <Input
        id={'rows'}
        type="number"
        min={1}
        max={MAX_ROWS}
        value={rows}
        label={`Rows`}
        onChange={onChangeRows}
        helperText={`(1-${MAX_ROWS})`}
        helperType={rows > MAX_ROWS || rows < 1 ? HelperType.Danger : undefined}
      />

      <Row gap="md" alignSelf="end">
        <Button onClick={handleSubmit}>Insert table</Button>
      </Row>
    </Col>
  );
};

export default TableModalContent;
