import React from 'react';
import { BsChevronDown, BsType } from 'react-icons/bs';
import { LexicalEditor } from 'lexical';
import { ToolbarItemButton } from './componentsToolbar';
import { IconWrapper } from './ToolbarButtonBlockType';
import { styled } from '../../../../styles/stitches.config';
import ToolbarDropdownFormattingText from './ToolbarDropdownFormattingText';

const ChevronWrapper = styled(IconWrapper, {
  width: '14px',
  height: '14px',
  marginRight: 0,
  marginLeft: '4px',
});

interface ToolbarButtonFormattingTextProps {
  disabled?: boolean;
  editor: LexicalEditor;

  isStrikethrough: boolean;
  isCode: boolean;
  isLink: boolean;
}

const ToolbarButtonFormattingText: React.FC<ToolbarButtonFormattingTextProps> = ({
  disabled,
  editor,
  isStrikethrough,
  isCode,
  isLink,
}) => {
  return (
    <>
      <ToolbarDropdownFormattingText
        trigger={
          <ToolbarItemButton disabled={disabled} aria-label="Formatting Options">
            <IconWrapper>
              <BsType />
            </IconWrapper>
            <ChevronWrapper>
              <BsChevronDown />
            </ChevronWrapper>
          </ToolbarItemButton>
        }
        editor={editor}
        isStrikethrough={isStrikethrough}
        isCode={isCode}
        isLink={isLink}
      />
    </>
  );
};

export default ToolbarButtonFormattingText;
