import React, { useCallback, useRef } from 'react';
import { $getSelection, $isRangeSelection, $createParagraphNode, LexicalEditor } from 'lexical';
import { $wrapNodes } from '@lexical/selection';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $createCodeNode } from '@lexical/code';
import {
  BsChatSquareQuote,
  BsCode,
  BsListOl,
  BsListUl,
  BsTextParagraph,
  BsTypeH1,
  BsTypeH2,
} from 'react-icons/bs';
import { DropdownMenuRoot } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuRoot';
import { DropdownMenuTrigger } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuTrigger';
import { DropdownMenuPortal } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuPortal';
import { DropdownMenuContent } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuContent';
import { DropdownMenuCheckboxItem } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuCheckboxItem';
import { DropdownMenuItemIndicator } from '../../../../components-radix-ui/DropdownMenu/DropdownMenuItemIndicator';

interface ToolbarDropdownBlockTypeProps {
  trigger: React.ReactNode;
  editor: LexicalEditor;
  blockType: string;
}

const ToolbarDropdownBlockType = ({
  trigger,
  editor,
  blockType,
}: ToolbarDropdownBlockTypeProps): JSX.Element => {
  const formatParagraph = useCallback(() => {
    if (blockType !== 'paragraph') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode());
        }
      });
    }
  }, [blockType, editor]);

  const formatLargeHeading = useCallback(() => {
    if (blockType !== 'h1') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode('h1'));
        }
      });
    }
  }, [blockType, editor]);

  const formatSmallHeading = useCallback(() => {
    if (blockType !== 'h2') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode('h2'));
        }
      });
    }
  }, [blockType, editor]);

  const formatBulletList = useCallback(() => {
    if (blockType !== 'ul') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);

  const formatNumberedList = useCallback(() => {
    if (blockType !== 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);

  const formatQuote = useCallback(() => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode());
        }
      });
    }
  }, [blockType, editor]);

  const formatCode = useCallback(() => {
    if (blockType !== 'code') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createCodeNode());
        }
      });
    }
  }, [blockType, editor]);

  return (
    <DropdownMenuRoot modal={false}>
      <DropdownMenuTrigger noBorder asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            active={blockType === 'paragraph'}
            aria-label="Normal paragraph"
            checked={true}
            padding="lg"
            onSelect={formatParagraph}
          >
            <DropdownMenuItemIndicator>
              <BsTextParagraph />
            </DropdownMenuItemIndicator>
            Normal
          </DropdownMenuCheckboxItem>

          <DropdownMenuCheckboxItem
            active={blockType === 'h1'}
            aria-label="Large heading"
            checked={true}
            padding="lg"
            onSelect={formatLargeHeading}
          >
            <DropdownMenuItemIndicator>
              <BsTypeH1 />
            </DropdownMenuItemIndicator>
            Large Heading
          </DropdownMenuCheckboxItem>

          <DropdownMenuCheckboxItem
            active={blockType === 'h2'}
            aria-label="Small heading"
            checked={true}
            padding="lg"
            onSelect={formatSmallHeading}
          >
            <DropdownMenuItemIndicator>
              <BsTypeH2 />
            </DropdownMenuItemIndicator>
            Small Heading
          </DropdownMenuCheckboxItem>

          <DropdownMenuCheckboxItem
            active={blockType === 'ul'}
            aria-label="Bulleted list"
            checked={true}
            padding="lg"
            onSelect={formatBulletList}
          >
            <DropdownMenuItemIndicator>
              <BsListUl />
            </DropdownMenuItemIndicator>
            Bulleted List
          </DropdownMenuCheckboxItem>

          <DropdownMenuCheckboxItem
            active={blockType === 'ol'}
            aria-label="Numbered list"
            checked={true}
            padding="lg"
            onSelect={formatNumberedList}
          >
            <DropdownMenuItemIndicator>
              <BsListOl />
            </DropdownMenuItemIndicator>
            Numbered List
          </DropdownMenuCheckboxItem>

          <DropdownMenuCheckboxItem
            active={blockType === 'quote'}
            aria-label="Quote"
            checked={true}
            padding="lg"
            onSelect={formatQuote}
          >
            <DropdownMenuItemIndicator>
              <BsChatSquareQuote />
            </DropdownMenuItemIndicator>
            Quote
          </DropdownMenuCheckboxItem>

          <DropdownMenuCheckboxItem
            active={blockType === 'code'}
            aria-label="Code block"
            checked={true}
            padding="lg"
            onSelect={formatCode}
          >
            <DropdownMenuItemIndicator>
              <BsCode />
            </DropdownMenuItemIndicator>
            Code Block
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  );
};

export default ToolbarDropdownBlockType;
