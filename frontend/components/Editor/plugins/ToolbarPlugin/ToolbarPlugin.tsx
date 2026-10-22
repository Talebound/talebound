import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  $getSelection,
  $isRangeSelection,
  ElementFormatType,
} from 'lexical';
import { $isLinkNode } from '@lexical/link';
import { $isParentElementRTL } from '@lexical/selection';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { $isListNode, ListNode } from '@lexical/list';
import { createPortal } from 'react-dom';
import { $isHeadingNode } from '@lexical/rich-text';
import { $isCodeNode, getDefaultCodeLanguage } from '@lexical/code';
import FloatingLinkEditor from './FloatingLinkEditor';
import {
  BsArrowClockwise,
  BsArrowCounterclockwise,
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
} from 'react-icons/bs';
import { Divider, Toolbar, ToolbarItemButton } from './componentsToolbar';
import ToolbarButtonBlockType, { BlockType } from './ToolbarButtonBlockType';
import SelectCodeLanguage from './SelectCodeLanguage';
import ToolbarButtonAlignType from './ToolbarButtonAlignType';
import ToolbarButtonFormattingText from './ToolbarButtonFormattingText';
import ToolbarButtonInsert from './ToolbarButtonInsert';
import { getSelectedNode } from './toolbarLib';

export const LOW_PRIORITY = 1;

interface ToolbarPluginProps {
  disabled?: boolean;
}

const ToolbarPlugin: React.FC<ToolbarPluginProps> = ({ disabled = false }) => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState<BlockType>('paragraph');
  const [alignType, setAlignType] = useState<ElementFormatType>('left');
  const [selectedElementKey, setSelectedElementKey] = useState<string | null>(null);
  const [codeLanguage, setCodeLanguage] = useState('');
  const [_, setIsRTL] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type: BlockType = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type: BlockType = $isHeadingNode(element)
            ? element.getTag()
            : // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              (element.getType() as BlockType);
          setBlockType(type);
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() ?? getDefaultCodeLanguage());
          }
        }
      }
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsCode(selection.hasFormat('code'));
      setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);

      const parent = node.getParent();
      setAlignType(parent?.getFormatType() ?? 'left');
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload) => {
          //unused - newEditor
          updateToolbar();
          return false;
        },
        LOW_PRIORITY,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LOW_PRIORITY,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LOW_PRIORITY,
      ),
    );
  }, [editor, updateToolbar]);

  const undoCallback = useCallback(() => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  }, [editor]);

  const redoCallback = useCallback(() => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  }, [editor]);

  const boldTextCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
  }, [editor]);

  const italicTextCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
  }, [editor]);

  const underlineTextCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
  }, [editor]);

  return (
    <Toolbar data-test-id="toolbar" ref={toolbarRef}>
      <ToolbarItemButton disabled={!canUndo || disabled} onClick={undoCallback} aria-label="Undo">
        <BsArrowCounterclockwise />
      </ToolbarItemButton>
      <ToolbarItemButton disabled={!canRedo || disabled} onClick={redoCallback} aria-label="Redo">
        <BsArrowClockwise />
      </ToolbarItemButton>
      <Divider />
      <ToolbarButtonBlockType disabled={disabled} blockType={blockType} editor={editor} />
      {blockType === 'code' ? (
        <SelectCodeLanguage
          disabled={disabled}
          selectedElementKey={selectedElementKey}
          editor={editor}
          codeLanguage={codeLanguage}
        />
      ) : (
        <>
          <ToolbarItemButton
            disabled={disabled}
            onClick={boldTextCallback}
            active={isBold}
            aria-label="Format Bold"
          >
            <BsTypeBold />
          </ToolbarItemButton>
          <ToolbarItemButton
            disabled={disabled}
            onClick={italicTextCallback}
            active={isItalic}
            aria-label="Format Italics"
          >
            <BsTypeItalic />
          </ToolbarItemButton>
          <ToolbarItemButton
            disabled={disabled}
            onClick={underlineTextCallback}
            active={isUnderline}
            aria-label="Format Underline"
          >
            <BsTypeUnderline />
          </ToolbarItemButton>
          <ToolbarButtonFormattingText
            disabled={disabled}
            editor={editor}
            isStrikethrough={isStrikethrough}
            isCode={isCode}
            isLink={isLink}
          />
          <Divider />
          <ToolbarButtonAlignType disabled={disabled} alignType={alignType} editor={editor} />
          <Divider />
          <ToolbarButtonInsert disabled={disabled} editor={editor} />
          {isLink && createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
        </>
      )}
    </Toolbar>
  );
};

export default ToolbarPlugin;
