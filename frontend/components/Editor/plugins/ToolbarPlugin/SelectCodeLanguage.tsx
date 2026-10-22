import React, { useCallback, useMemo } from 'react';
import { $getNodeByKey, LexicalEditor } from 'lexical';
import { $isCodeNode, getCodeLanguages } from '@lexical/code';
import { ToolbarSelect } from './componentsToolbar';
import { styled } from '../../../../styles/stitches.config';

export const ToolbarCodeLanguageSelect = styled(ToolbarSelect, {
  textTransform: 'capitalize',
  width: '130px',
});

interface SelectCodeLanguageProps {
  disabled?: boolean;
  selectedElementKey: string | null;
  editor: LexicalEditor;
  codeLanguage: string;
}

const SelectCodeLanguage: React.FC<SelectCodeLanguageProps> = ({
  disabled,
  selectedElementKey,
  editor,
  codeLanguage,
}) => {
  const codeLanguages = useMemo(() => getCodeLanguages(), []);

  const onCodeLanguageSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(e.target.value);
          }
        }
      });
    },
    [editor, selectedElementKey],
  );

  return (
    <ToolbarCodeLanguageSelect
      disabled={disabled}
      onChange={onCodeLanguageSelect}
      value={codeLanguage}
    >
      <option hidden={true} value="" />
      {codeLanguages.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </ToolbarCodeLanguageSelect>
  );
};

export default SelectCodeLanguage;
