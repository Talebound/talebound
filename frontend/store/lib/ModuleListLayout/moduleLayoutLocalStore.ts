import { PbModuleType } from '../../../generated/api-types/data-contracts';
import { LayoutToggleGroupOption } from '../../../components/LayoutToggleGroup/layoutToggleGroupLib';
import { getItem, LSKey, LSValues, setItem } from '../../localStore';

export type ModuleListLayoutMap = Partial<Record<PbModuleType, LayoutToggleGroupOption>>;

export const getModuleListLayoutLocalStore = (
  moduleType: PbModuleType,
  defaultValue?: LayoutToggleGroupOption,
): LayoutToggleGroupOption => {
  try {
    const saved = getItem(LSKey.MODULE_LIST_LAYOUT)?.[moduleType];
    if (saved === 'rowLayout' || saved === 'gridLayout') return saved;
  } catch {
    /* Storage can be unavailable or contain an older value. */
  }
  return defaultValue ?? 'rowLayout';
};

export const setModuleListLayoutLocalStore = (
  moduleType: PbModuleType,
  value: LayoutToggleGroupOption,
) => {
  try {
    const currentLocalStore = getItem(LSKey.MODULE_LIST_LAYOUT);

    const newValue = currentLocalStore
      ? { ...currentLocalStore, [moduleType]: value }
      : ({ [moduleType]: value } as LSValues[LSKey.MODULE_LIST_LAYOUT]);

    setItem(LSKey.MODULE_LIST_LAYOUT, newValue);
  } catch {
    /* Layout selection still works without browser storage. */
  }
};
