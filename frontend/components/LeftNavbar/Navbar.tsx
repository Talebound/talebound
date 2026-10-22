import React, { useEffect } from 'react';
import NavbarHeader from './NavbarHeader';
import { NavbarWrapper, NavbarItem, NavbarSquare } from './navbarComponents';
import { useGetMenuItems } from '../../api/menus/useGetMenuItems';
import { useGetMenuById } from '../../api/menus/useGetMenuById';
import { useDispatch } from 'react-redux';
import { setMenuImage } from '../../store/globalSlice';
import { IMAGE_DEFAULT_MENU } from '../../utils/images/imageDefaultUrls';

export interface NavbarItem {
  key: React.Key;
  title: string;
  url: string;
}

interface NavbarProps {
  menuId: number;
  urlPrefix: string;
  prefixItems?: NavbarItem[];
  postfixItemsTitle?: string;
  postfixItems?: NavbarItem[];
}

const Navbar: React.FC<NavbarProps> = ({
  menuId,
  urlPrefix,
  prefixItems = [],
  postfixItemsTitle = '',
  postfixItems = [],
}) => {
  const dispatch = useDispatch();
  const { data: menuData } = useGetMenuById({ variables: menuId });
  const { data: menuItemsData = [] } = useGetMenuItems({ variables: menuId });

  useEffect(() => {
    if (menuData) {
      if (menuData.headerImageUrl) {
        console.log('menuData', menuData);
        console.log('menuDataHeader', menuData?.headerImageUrl);
        dispatch(setMenuImage(menuData?.headerImageUrl));
      } else {
        dispatch(setMenuImage(IMAGE_DEFAULT_MENU));
      }
    }
  }, [dispatch, menuData, menuData?.headerImageUrl]);

  return (
    <NavbarWrapper>
      {prefixItems?.map((item) => (
        <NavbarItem key={item.key} href={item.url}>
          {item.title}
          <NavbarSquare />
        </NavbarItem>
      ))}
      {menuItemsData.map((item) => {
        if (item.isMain) return <NavbarHeader key={item.id} title={item.name ?? ''} />;
        if (item.code) {
          return (
            <NavbarItem key={item.id} href={`${urlPrefix}/${item.code}`}>
              {item.name ?? 'Menu item'}
              <NavbarSquare />
            </NavbarItem>
          );
        }
        return null;
      })}
      {postfixItems.length > 0 && <NavbarHeader title={postfixItemsTitle} />}
      {postfixItems.map((item) => (
        <NavbarItem key={item.key} href={item.url}>
          {item.title}
          <NavbarSquare />
        </NavbarItem>
      ))}
    </NavbarWrapper>
  );
};

export default Navbar;
