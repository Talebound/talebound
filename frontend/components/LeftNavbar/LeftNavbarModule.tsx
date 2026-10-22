import React, { useMemo } from 'react';
import Navbar, { NavbarItem } from './Navbar';
import { isModuleCollaborator, useMyModuleRole } from '../../hooks/useModuleAdmins';
import { useModule } from '../../hooks/useModule';

interface LeftNavbarModuleProps {
  moduleId: number;
}

const LeftNavbarModule: React.FC<LeftNavbarModuleProps> = ({ moduleId }) => {
  const { module, moduleTypeId, linkPrefix } = useModule(moduleId);
  const menuId = module?.menuId ?? 0;
  const role = useMyModuleRole(moduleId);

  const postfixItems: NavbarItem[] = useMemo(() => {
    if (isModuleCollaborator(role)) {
      return [
        {
          key: 'posts',
          title: 'Posts',
          url: `/${linkPrefix}/${moduleTypeId}/posts`,
        },
        {
          key: 'maps',
          title: 'Maps',
          url: `/${linkPrefix}/${moduleTypeId}/maps`,
        },
        {
          key: 'locations',
          title: 'Locations',
          url: `/${linkPrefix}/${moduleTypeId}/locations`,
        },
      ];
    }

    return [];
  }, [role, linkPrefix, moduleTypeId]);

  return (
    <Navbar
      menuId={menuId}
      urlPrefix={`/${linkPrefix}/${moduleTypeId}/c`}
      postfixItemsTitle="Admin"
      postfixItems={postfixItems}
    />
  );
};

export default LeftNavbarModule;
