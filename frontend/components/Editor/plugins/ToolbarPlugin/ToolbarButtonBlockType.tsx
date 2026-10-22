import React, { useCallback, useEffect, useState } from 'react';
import {
  BsChatSquareQuote,
  BsChevronDown,
  BsCode,
  BsListOl,
  BsListUl,
  BsTextParagraph,
  BsTypeH1,
  BsTypeH2,
  BsTypeH3,
} from 'react-icons/bs';
import { createPortal } from 'react-dom';
import ToolbarDropdownBlockType from './ToolbarDropdownBlockType';
import { Divider, ToolbarItemButton } from './componentsToolbar';
import { LexicalEditor } from 'lexical';
import { styled } from '../../../../styles/stitches.config';

export const IconWrapper = styled('span', {
  display: 'flex',
  width: '20px',
  height: '20px',
  userSelect: 'none',
  marginRight: '8px',
  lineHeight: '16px',
  backgroundSize: 'contain',
});

const ChevronWrapper = styled(IconWrapper, {
  width: '14px',
  height: '14px',
  marginRight: 0,
  marginLeft: '4px',
});

export const TextWrapper = styled('span', {
  display: 'flex',
  lineHeight: '20px',
  verticalAlign: 'middle',
  fontSize: '14px',
  color: '#777',
  textOverflow: 'ellipsis',
  width: '70px',
  overflow: 'hidden',
  height: '20px',
  textAlign: 'left',
});

const supportedBlockTypes = new Set(['paragraph', 'quote', 'code', 'h1', 'h2', 'ul', 'ol']);

export type BlockType =
  | 'code'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'ol'
  | 'paragraph'
  | 'quote'
  | 'ul';

interface BlockTypeInfo {
  name: string;
  iconName: React.ReactNode;
}

const blockTypeToBlockName: Record<BlockType, BlockTypeInfo> = {
  code: {
    name: 'Code Block',
    iconName: <BsCode />,
  },
  h1: {
    name: 'Large Heading',
    iconName: <BsTypeH1 />,
  },
  h2: {
    name: 'Small Heading',
    iconName: <BsTypeH2 />,
  },
  h3: {
    name: 'Heading',
    iconName: <BsTypeH3 />,
  },
  h4: {
    name: 'Heading',
    iconName: <BsTypeH3 />,
  },
  h5: {
    name: 'Heading',
    iconName: <BsTypeH3 />,
  },
  h6: {
    name: 'Heading',
    iconName: <BsTypeH3 />,
  },
  ul: {
    name: 'Bulleted List',
    iconName: <BsListUl />,
  },
  ol: {
    name: 'Numbered List',
    iconName: <BsListOl />,
  },
  paragraph: {
    name: 'Normal',
    iconName: <BsTextParagraph />,
  },
  quote: {
    name: 'Quote',
    iconName: <BsChatSquareQuote />,
  },
};

interface ToolbarButtonBlockTypeProps {
  disabled?: boolean;
  blockType: BlockType;
  editor: LexicalEditor;
}

const ToolbarButtonBlockType: React.FC<ToolbarButtonBlockTypeProps> = ({
  disabled,
  blockType,
  editor,
}) => {
  useEffect(() => {
    if (!blockTypeToBlockName[blockType]) {
      console.error(`Unsupported block type: ${blockType}`);
    }
  }, [blockType]);

  return (
    <>
      <ToolbarDropdownBlockType
        trigger={
          <ToolbarItemButton disabled={disabled} aria-label="Formatting Options">
            <IconWrapper>{blockTypeToBlockName[blockType]?.iconName ?? 'A'}</IconWrapper>
            <TextWrapper>{blockTypeToBlockName[blockType]?.name ?? 'a'}</TextWrapper>
            <ChevronWrapper>
              <BsChevronDown />
            </ChevronWrapper>
          </ToolbarItemButton>
        }
        editor={editor}
        blockType={blockType}
      />
      <Divider />
    </>
  );
};

export default ToolbarButtonBlockType;
