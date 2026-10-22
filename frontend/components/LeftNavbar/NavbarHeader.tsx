import { styled } from '../../styles/stitches.config';
import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../store';

const NavbarHeaderComponent = styled('div', {
  position: 'relative',
  width: '100%',
  height: '50px',
});

const NavbarHeaderBg = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  opacity: 0.25,
  zIndex: 1,
});

const NavbarHeaderContent = styled('div', {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 2,
  fontSize: '$4xl',
  fontFamily: '$decorative',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundClip: 'text',
  color: 'transparent',
});

interface NavbarHeaderProps {
  title: string;
  customImage?: string;
}

const NavbarHeader: React.FC<NavbarHeaderProps> = ({ title, customImage }) => {
  const image = useSelector((state: ReduxState) => state.global.menuImage);

  return (
    <NavbarHeaderComponent>
      <NavbarHeaderBg css={{ backgroundImage: `url("${customImage ?? image}")` }} />
      <NavbarHeaderContent css={{ backgroundImage: `url("${customImage ?? image}")` }}>
        {title}
      </NavbarHeaderContent>
    </NavbarHeaderComponent>
  );
};

export default NavbarHeader;
