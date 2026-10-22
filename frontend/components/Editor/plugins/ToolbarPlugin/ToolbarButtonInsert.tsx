import React from 'react';
import { BsChevronDown, BsPlus } from 'react-icons/bs';
import { LexicalEditor } from 'lexical';
import { ToolbarItemButton } from './componentsToolbar';
import { IconWrapper } from './ToolbarButtonBlockType';
import { styled } from '../../../../styles/stitches.config';
import ToolbarDropdownInsert from './ToolbarDropdownInsert';

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
  overflow: 'hidden',
  height: '20px',
  textAlign: 'left',
});

interface ToolbarButtonInsertProps {
  disabled?: boolean;
  editor: LexicalEditor;
}

const ToolbarButtonInsert: React.FC<ToolbarButtonInsertProps> = ({ disabled, editor }) => {
  return (
    <>
      <ToolbarDropdownInsert
        trigger={
          <ToolbarItemButton disabled={disabled} aria-label="Formatting Options">
            <IconWrapper>
              <BsPlus />
            </IconWrapper>
            <TextWrapper>Insert</TextWrapper>
            <ChevronWrapper>
              <BsChevronDown />
            </ChevronWrapper>
          </ToolbarItemButton>
        }
        editor={editor}
      />
    </>
  );
};

export default ToolbarButtonInsert;
