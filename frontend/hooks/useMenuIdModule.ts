import { useModule } from './useModule';

export const useMenuIdModule = (moduleId: number) => {
  const { module } = useModule(moduleId);
  return module?.menuId ?? 0;
};
