import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import MenuCategory from '../../screens/menus/MenuCategory/MenuCategory';
import { useDispatch } from 'react-redux';
import { setOpenedUrlPrefix } from '../../screens/menus/MenuCategory/menuCategorySlice';

interface MenuCategoryProps {
  menuId: number;
  entityId?: number;
  linkPrefix: string;
  canEdit?: boolean;
}

const MenuCategoryPage: React.FC<MenuCategoryProps> = ({
  entityId,
  linkPrefix,
  menuId,
  canEdit,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const m = router.query['menuCategory'];

  const menuItemCode = useMemo(() => {
    return typeof m === 'string' ? m : '';
  }, [m]);

  useEffect(() => {
    dispatch(setOpenedUrlPrefix(`${linkPrefix}/c/${menuItemCode}`));
  }, [dispatch, linkPrefix, menuItemCode]);

  return (
    <MenuCategory
      menuItemCode={menuItemCode}
      menuId={menuId}
      entityId={entityId}
      canEdit={canEdit}
    />
  );
};

export default MenuCategoryPage;
