import { PbModuleType } from '../../../generated/api-types/data-contracts';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setModuleListLayout } from '../../globalSlice';
import { LayoutToggleGroupOption } from '../../../components/LayoutToggleGroup/layoutToggleGroupLib';
import {
  getModuleListLayoutLocalStore,
  setModuleListLayoutLocalStore,
} from './moduleLayoutLocalStore';

export const useModuleListLayout = (
  moduleType: PbModuleType,
): [LayoutToggleGroupOption, (value: LayoutToggleGroupOption) => void] => {
  const dispatch = useAppDispatch();
  const savedLayout = useAppSelector((state) => state.global.moduleListLayout[moduleType]);
  useEffect(() => {
    if (!savedLayout)
      dispatch(
        setModuleListLayout({ moduleType, value: getModuleListLayoutLocalStore(moduleType) }),
      );
  }, [dispatch, moduleType, savedLayout]);
  const setLayout = useCallback(
    (value: LayoutToggleGroupOption) => {
      if (value !== 'rowLayout' && value !== 'gridLayout') return;
      dispatch(setModuleListLayout({ moduleType, value }));
      setModuleListLayoutLocalStore(moduleType, value);
    },
    [dispatch, moduleType],
  );
  return [savedLayout ?? 'rowLayout', setLayout];
};
