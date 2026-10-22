import React from 'react';
import {
  InputWrapper,
  Item,
  MENU_ADMINISTRATION_BREAKPOINT_MAX,
  MENU_ADMINISTRATION_BREAKPOINT_MIN,
  NavbarWrapper,
} from './menuAdministrationComponents';
import { styled } from '../../../styles/stitches.config';
import { Text } from '../../../components/Typography/Text';

const HeaderItem = styled(Item, {
  [MENU_ADMINISTRATION_BREAKPOINT_MAX]: {
    display: 'none',
  },
});

const HeaderInfo = styled(Text, {
  [MENU_ADMINISTRATION_BREAKPOINT_MIN]: {
    display: 'none',
  },
});

const HeaderControls = styled('div', {
  marginLeft: '10px',
  width: '134px',
  fontWeight: 'bold',
});

const HeaderNavbarWrapper = styled(NavbarWrapper, {
  backgroundColor: 'white',
  fontWeight: 'bold',
});

const HeaderInputWrapper = styled(InputWrapper, {
  fontWeight: 'bold',
});

const MenuHeader: React.FC = () => {
  return (
    <>
      <HeaderInfo i>
        (Note: user experience in menu administration is better on wider screens)
      </HeaderInfo>
      <HeaderItem gap="xs">
        <HeaderControls>Controls</HeaderControls>
        <HeaderNavbarWrapper>Preview</HeaderNavbarWrapper>
        <HeaderInputWrapper>Title</HeaderInputWrapper>
        <HeaderInputWrapper>URL code</HeaderInputWrapper>
      </HeaderItem>
    </>
  );
};

export default MenuHeader;
