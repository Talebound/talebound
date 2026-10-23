import React, { Suspense, useMemo } from 'react';
import ActionBoxModule from '../ActionBox/ActionBoxModule';
import Layout from '../../../components/Layout/Layout';
import MenuAdministration from '../../menus/MenuAdministration/MenuAdministration';
import LeftNavbarModule from '../../../components/LeftNavbar/LeftNavbarModule';
import { isModuleCollaborator, useMyModuleRole } from '../../../hooks/useModuleAdmins';
import { Text } from '../../../components/Typography/Text';
import { useModule } from '../../../hooks/useModule';

const RESERVED_MENU_ITEM_CODES = ['maps'];

interface EditModuleMenuProps {
  moduleId: number;
}

const EditModuleMenu: React.FC<EditModuleMenuProps> = ({ moduleId }) => {
  const { role } = useMyModuleRole(moduleId);
  const { module } = useModule(moduleId);
  const menuId = module?.menuId ?? 0;

  const navbar = useMemo(
    () => (
      <Suspense fallback={null}>
        <LeftNavbarModule moduleId={moduleId} />
      </Suspense>
    ),
    [moduleId],
  );

  return (
    <>
      <Layout vertical={true} navbar={navbar}>
        {menuId > 0 && isModuleCollaborator(role) && (
          <MenuAdministration menuId={menuId} reservedCodes={RESERVED_MENU_ITEM_CODES} />
        )}
        {!isModuleCollaborator(role) && <Text>This page is accessible only for collaborators</Text>}
      </Layout>
      <ActionBoxModule moduleId={moduleId} activeButton="menu" />
    </>
  );
};

export default EditModuleMenu;
