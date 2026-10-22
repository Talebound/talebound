import React from 'react';
import NavbarHeader from './NavbarHeader';
import { NavbarWrapper, NavbarItem, NavbarSquare } from './navbarComponents';

const LeftNavbarAdmin: React.FC = () => {
  return (
    <NavbarWrapper>
      <NavbarHeader title="admin" />
      <NavbarItem href="/admin">
        Dashboard <NavbarSquare />
      </NavbarItem>
      <NavbarHeader title="tags" />
      <NavbarItem href="/admin/world-tags">
        World tags <NavbarSquare />
      </NavbarItem>
      <NavbarItem href="/admin/system-tags">
        System tags <NavbarSquare />
      </NavbarItem>
      <NavbarItem href="/admin/character-tags">
        Character tags <NavbarSquare />
      </NavbarItem>
      <NavbarItem href="/admin/quest-tags">
        Quest tags <NavbarSquare />
      </NavbarItem>
    </NavbarWrapper>
  );
};

export default LeftNavbarAdmin;
