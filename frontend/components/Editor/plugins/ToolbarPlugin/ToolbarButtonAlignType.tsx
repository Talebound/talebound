import React from 'react';
import { BsChevronDown, BsJustify, BsTextCenter, BsTextLeft, BsTextRight } from 'react-icons/bs';
import { ElementFormatType, LexicalEditor } from 'lexical';
import { ToolbarItemButton } from './componentsToolbar';
import { IconWrapper } from './ToolbarButtonBlockType';
import { styled } from '../../../../styles/stitches.config';
import ToolbarDropdownAlignType from './ToolbarDropdownAlignType';

const ChevronWrapper = styled(IconWrapper, {
  width: '14px',
  height: '14px',
  marginRight: 0,
  marginLeft: '4px',
});

export type AlignType = 'left' | 'right' | 'center' | 'justify';

interface AlignTypeInfo {
  name: string;
  iconName: React.ReactNode;
}

const alignTypeToAlignName: Record<ElementFormatType, AlignTypeInfo> = {
  left: {
    name: 'Left',
    iconName: <BsTextLeft />,
  },
  start: {
    name: 'Start',
    iconName: <BsTextLeft />,
  },
  right: {
    name: 'Right',
    iconName: <BsTextRight />,
  },
  end: {
    name: 'End',
    iconName: <BsTextRight />,
  },
  center: {
    name: 'Center',
    iconName: <BsTextCenter />,
  },
  justify: {
    name: 'Justify',
    iconName: <BsJustify />,
  },
  ['']: {
    name: 'Left',
    iconName: <BsTextLeft />,
  },
};

interface ToolbarButtonAlignControlsProps {
  disabled?: boolean;
  alignType: ElementFormatType;
  editor: LexicalEditor;
}

const ToolbarButtonAlignType: React.FC<ToolbarButtonAlignControlsProps> = ({
  disabled,
  alignType,
  editor,
}) => {
  return (
    <ToolbarDropdownAlignType
      trigger={
        <ToolbarItemButton disabled={disabled} aria-label="Formatting Options">
          <IconWrapper>{alignTypeToAlignName[alignType].iconName}</IconWrapper>
          <ChevronWrapper>
            <BsChevronDown />
          </ChevronWrapper>
        </ToolbarItemButton>
      }
      editor={editor}
    />
  );
};

export default ToolbarButtonAlignType;
