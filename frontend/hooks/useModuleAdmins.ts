import { useGetModuleAdmins } from '../api/modules/useGetModuleAdmins';
import { PbModuleAdmin } from '../generated/api-types/data-contracts';
import { useSelector } from 'react-redux';
import { UserRole } from '../utils/auth/userUtils';

export enum ModuleAdminRole {
  NONE = 'NONE',
  COLLABORATOR = 'COLLABORATOR',
  SUPER_COLLABORATOR = 'SUPER_COLLABORATOR',
  REQUESTED = 'REQUESTED',
  DENIED = 'DENIED',
}

export function useModuleAdmins(moduleId: number): PbModuleAdmin[] {
  const { data: moduleAdminData } = useGetModuleAdmins({
    variables: moduleId ?? 0,
  });

  return moduleAdminData ?? [];
}

export function useMyModuleRole(moduleId: number): ModuleAdminRole {
  const userId = useSelector((state) => state.auth.user?.id);
  const userRole = useSelector((state) => state.auth.role);
  const moduleAdmins = useModuleAdmins(moduleId);

  const myAdmin = moduleAdmins.find((moduleAdmin) => moduleAdmin.userId === userId);

  if (userRole === UserRole.Admin) {
    return ModuleAdminRole.SUPER_COLLABORATOR;
  }

  if (myAdmin) {
    switch (myAdmin.approved) {
      case 2:
        return ModuleAdminRole.REQUESTED;
      case 1:
        return myAdmin.superAdmin
          ? ModuleAdminRole.SUPER_COLLABORATOR
          : ModuleAdminRole.COLLABORATOR;
      case 0:
      case undefined:
        return ModuleAdminRole.DENIED;
    }
  }
  return ModuleAdminRole.NONE;
}

export const isModuleCollaborator = (role: ModuleAdminRole): boolean => {
  return role === ModuleAdminRole.COLLABORATOR || role === ModuleAdminRole.SUPER_COLLABORATOR;
};
