import React from 'react';
import { ToggleGroupItem } from '../../components-radix-ui/ToggleGroup/ToggleGroupItem';
import { ToggleGroupRoot } from '../../components-radix-ui/ToggleGroup/ToggleGroupRoot';
import { ToggleGroupItem as ToggleGroupItems } from '../../components-radix-ui/ToggleGroup/toggleGroupLib';
import { ToggleGroupMultipleProps, ToggleGroupSingleProps } from '@radix-ui/react-toggle-group';

export type ToggleGroupSingleOrMultipleProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;

export type ToggleGroupComponentProps<T> = {
  items: ToggleGroupItems<T>[];
} & ToggleGroupSingleOrMultipleProps;

const ToggleGroup = <T extends string>({ items, ...otherProps }: ToggleGroupComponentProps<T>) => {
  return (
    <ToggleGroupRoot {...otherProps}>
      {items.map((i) => (
        <ToggleGroupItem key={i.value as string} value={i.value as string} aria-label={i.label}>
          {i.icon}
        </ToggleGroupItem>
      ))}
    </ToggleGroupRoot>
  );
};

export default ToggleGroup;
