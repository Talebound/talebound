import React, { useCallback } from 'react';
import { ToggleGroupItem as ToggleGroupItems } from '../../components-radix-ui/ToggleGroup/toggleGroupLib';
import { TbLayoutGrid, TbLayoutRows } from 'react-icons/tb';
import ToggleGroup from '../ToggleGroup/ToggleGroup';
import { LayoutToggleGroupOption } from './layoutToggleGroupLib';
import { ToggleGroupSingleProps } from '@radix-ui/react-toggle-group';
import { PbModuleType } from '../../generated/api-types/data-contracts';
import { useModuleListLayout } from '../../store/lib/ModuleListLayout/useModuleListLayout';

const layoutToggleGroupItems: ToggleGroupItems<LayoutToggleGroupOption>[] = [
  {
    label: 'Row layout',
    value: 'rowLayout',
    icon: <TbLayoutRows />,
  },
  {
    label: 'Grid layout',
    value: 'gridLayout',
    icon: <TbLayoutGrid />,
  },
];

type LayoutToggleGroupProps = Omit<
  ToggleGroupSingleProps,
  'type' | 'onValueChange' | 'defaultValue'
> & {
  moduleType?: PbModuleType;
};

const LayoutToggleGroup: React.FC<LayoutToggleGroupProps> = ({
  moduleType = PbModuleType.MODULE_TYPE_UNKNOWN,
  ...toggleGroupProps
}) => {
  const [layout, setLayout] = useModuleListLayout(moduleType);

  const changeHandler = useCallback(
    (value: LayoutToggleGroupOption) => {
      setLayout(value);
    },
    [setLayout],
  );

  return (
    <ToggleGroup
      type="single"
      items={layoutToggleGroupItems}
      onValueChange={changeHandler}
      value={layout}
      {...toggleGroupProps}
    />
  );
};

export default LayoutToggleGroup;
