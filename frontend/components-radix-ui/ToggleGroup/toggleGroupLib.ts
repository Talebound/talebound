import React from 'react';
import { ToggleProps } from '@radix-ui/react-toggle';

export type ToggleGroupItem<T> = ToggleProps & {
  label: string;
  value: T;
  icon?: React.ReactNode;
};
