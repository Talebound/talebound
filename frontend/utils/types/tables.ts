import type { TableColumnType as ColumnType, TableProps } from 'antd';
import React from 'react';
import type { SorterResult } from 'antd/es/table/interface';

export interface Tables {
  orderBy: string;
  orderDirection: 'asc' | 'desc';
}

export const DEFAULT_ENTITY_SORT: Tables = { orderBy: 'created_at', orderDirection: 'desc' };
export const DEFAULT_LOCATION_SORT: Tables = { orderBy: 'id', orderDirection: 'desc' };

// Keep the table's minimum width inside its scroll area instead of expanding
// the surrounding flex layout on narrow screens.
export const ENTITY_TABLE_STYLE: React.CSSProperties = { width: '100%', contain: 'inline-size' };

export const columnSortOrder = (sorting: Tables, field: string) =>
  sorting.orderBy === field ? (sorting.orderDirection === 'asc' ? 'ascend' : 'descend') : null;

export type TaleboundColumnType<T> = ColumnType<T> & {
  sort_field?: string;
};

export type TaleboundSorterResult<T> = SorterResult<T> & {
  column?: TaleboundColumnType<T>;
};

export const tableSorter =
  <T>(
    setSorting: React.Dispatch<React.SetStateAction<Tables>>,
    defaultSorting: Tables,
    onPageChange: (page: number, pageSize: number) => void,
  ): TableProps<T>['onChange'] =>
  (pagination, _filters, sorter: TaleboundSorterResult<T> | TaleboundSorterResult<T>[], extra) => {
    if (extra.action === 'paginate') {
      onPageChange(pagination.current ?? 1, pagination.pageSize ?? 3);
    } else if (extra.action === 'sort' && !Array.isArray(sorter)) {
      setSorting(
        sorter.order && sorter.column?.sort_field
          ? {
              orderBy: sorter.column.sort_field,
              orderDirection: sorter.order === 'ascend' ? 'asc' : 'desc',
            }
          : defaultSorting,
      );
      onPageChange(1, pagination.pageSize ?? 3);
    }
  };

export enum EntityTableType {
  LIST = 0,
  DRAG = 1,
}
