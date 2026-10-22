import React from 'react';
import { HeaderNavigation } from '../../components/HeaderNavigation/HeaderNavigation';
import { NavigationItem } from '../../components/NavigationItem/NavigationItem';

const HomepageNavigation: React.FC = () => {
  return (
    <HeaderNavigation>
      <ul>
        <li>
          {' '}
          <NavigationItem href="/">Home</NavigationItem>{' '}
        </li>
        <li>
          {' '}
          <NavigationItem href="/">About</NavigationItem>{' '}
        </li>
        <li>
          {' '}
          <NavigationItem href="/">Worlds</NavigationItem>{' '}
        </li>
        <li>
          {' '}
          <NavigationItem href="/register">Register</NavigationItem>{' '}
        </li>
      </ul>
    </HeaderNavigation>
  );
};

export default HomepageNavigation;
