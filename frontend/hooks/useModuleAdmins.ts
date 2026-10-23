import { useGetModuleAdmins } from '../api/modules/useGetModuleAdmins';
import { PbModuleAdmin } from '../generated/api-types/data-contracts';
import { useAppSelector } from '../store/hooks';
import { UserRole } from '../utils/auth/userUtils';
import { useMemo } from 'react';

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

export interface ModuleRole {
  role: ModuleAdminRole;
  roleWithoutAdmin: ModuleAdminRole;
}

export function useMyModuleRole(moduleId: number): ModuleRole {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const userRole = useAppSelector((state) => state.auth.role);
  const moduleAdmins = useModuleAdmins(moduleId);

  const myAdmin = moduleAdmins.find((moduleAdmin) => moduleAdmin.userId === userId);

  const roleWithoutAdmin = useMemo(() => {
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
  }, [myAdmin]);

  const role = useMemo(() => {
    if (userRole === UserRole.Admin) {
      return ModuleAdminRole.SUPER_COLLABORATOR;
    }
    return roleWithoutAdmin;
  }, [roleWithoutAdmin, userRole]);

  return useMemo(
    () => ({
      role,
      roleWithoutAdmin,
    }),
    [role, roleWithoutAdmin],
  );
}

export const isModuleCollaborator = (role: ModuleAdminRole): boolean => {
  return role === ModuleAdminRole.COLLABORATOR || role === ModuleAdminRole.SUPER_COLLABORATOR;
};
