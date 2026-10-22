import React from 'react';
import NavbarHeader from './NavbarHeader';
import { NavbarWrapper, NavbarItem, NavbarSquare } from './navbarComponents';

const LeftNavbar: React.FC = () => {
  return (
    <NavbarWrapper>
      <NavbarHeader title="explore" />
      <NavbarItem href="/news">
        News <NavbarSquare />
      </NavbarItem>
      <NavbarItem href="/worlds">
        Worlds <NavbarSquare />
      </NavbarItem>
      <NavbarItem href="/systems">
        System <NavbarSquare />
      </NavbarItem>
      <NavbarItem href="/quests">
        Quests <NavbarSquare />
      </NavbarItem>
      <NavbarItem href="/characters">
        Characters <NavbarSquare />
      </NavbarItem>

      <NavbarHeader title="content" />
      <NavbarItem href="/content/images">
        Images <NavbarSquare />
      </NavbarItem>
      <NavbarItem href="/content/posts">
        Posts <NavbarSquare />
      </NavbarItem>

      <NavbarHeader title="guides" />
      <NavbarItem href="/guides/playing">
        Playing <NavbarSquare />
      </NavbarItem>
      <NavbarItem href="/guides/world-creation">
        World creation <NavbarSquare />
      </NavbarItem>
    </NavbarWrapper>
  );
};

export default LeftNavbar;
