import { ColumnType } from 'antd/es/table';
import React from 'react';
import { TableProps } from 'antd/lib';
import { SorterResult } from 'antd/lib/table/interface';

export interface Tables {
  orderBy: string;
  orderDirection: 'asc' | 'desc';
}

export type TaleboundColumnType<T> = ColumnType<T> & {
  sort_field?: string;
};

export type TaleboundSorterResult<T> = SorterResult<T> & {
  column?: TaleboundColumnType<T>;
};

export const tableSorter =
  <T>(setSorting: React.Dispatch<React.SetStateAction<Tables>>): TableProps<T>['onChange'] =>
  (_pagination, _filters, sorter: TaleboundSorterResult<T> | TaleboundSorterResult<T>[]) => {
    if (Array.isArray(sorter)) return;

    if (sorter.column?.sort_field) {
      setSorting({
        orderBy: sorter.column.sort_field,
        orderDirection: sorter.order === 'ascend' ? 'asc' : 'desc',
      });
    }
  };

export enum EntityTableType {
  LIST = 0,
  DRAG = 1,
}
