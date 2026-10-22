import React from 'react';
import Logo from '../../components/Logo/Logo';
import { Client } from 'react-hydration-provider';
import UserDropdown from '../../components/UserDropdown/UserDropdown';
import { styled } from '../../styles/stitches.config';
import { DecorativeTitle } from '../../components/Typography/DecorativeTitle';
import { Row } from '../../components/Flex/Flex';
import Link from 'next/link';
import { useUserRole } from '../../hooks/useUserRole';
import { isAtLeastModerator, UserRole } from '../../utils/auth/userUtils';
import { RiShieldStarLine, RiShieldUserLine } from 'react-icons/ri';
import { TbBell, TbMessage, TbShieldHalf, TbShieldHalfFilled, TbShieldStar } from 'react-icons/tb';

const StyledNavbar = styled('nav', {
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'saturate(180%) blur(8px) opacity(0)',
  boxShadow: '0 0 5px 0.1px $colors$primary900',
  position: 'sticky',
  top: '0',
  zIndex: 1000,
  width: '100%',
  height: '3rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 0,
  paddingRight: '$md',
});

const NavbarIconLink = styled(Link, {
  borderRadius: '$rounded',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',

  '&:hover': {
    backgroundColor: '$primary200',
  },
});

const Menu: React.FC = () => {
  const role = useUserRole();

  return (
    <StyledNavbar>
      <Link href="/home">
        <Row justifyContent="center" gap="sm" css={{ width: '250px' }}>
          <Logo size="2.5rem" />
          <DecorativeTitle>Talebound</DecorativeTitle>
        </Row>
      </Link>

      <Client>
        <Row gap="md">
          {isAtLeastModerator(role) && (
            <NavbarIconLink href="/moderator" title="Moderator dashboard">
              <TbShieldHalfFilled size={24} />
            </NavbarIconLink>
          )}
          {role === UserRole.Admin && (
            <NavbarIconLink href="/admin" title="Admin dashboard">
              <TbShieldStar size={24} />
            </NavbarIconLink>
          )}
          <NavbarIconLink href="/notifications" title="Message">
            <TbBell size={24} />
          </NavbarIconLink>
          <NavbarIconLink href="/messages" title="Message">
            <TbMessage size={24} />
          </NavbarIconLink>
          <UserDropdown />
        </Row>
      </Client>
    </StyledNavbar>
  );
};

export default Menu;
