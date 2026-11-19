import { PbEntityType } from '../generated/api-types/data-contracts';
import { useModuleAdmins } from './useModuleAdmins';
import { useAppSelector } from '../store/hooks';
import { UserRole } from '../utils/auth/userUtils';

export const useCanEditModuleEntities = (moduleId: number, types: PbEntityType[]): boolean => {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const role = useAppSelector((state) => state.auth.role);
  const admins = useModuleAdmins(moduleId);
  if (!moduleId || !userId) return false;
  if (role === UserRole.Admin) return true;
  const admin = admins.find((entry) => entry.userId === userId);
  return admin?.approved === 1 && types.every((type) => admin.allowedEntityTypes?.includes(type));
};
