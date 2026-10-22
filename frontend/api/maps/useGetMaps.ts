import { createInfiniteQuery } from 'react-query-kit';
import { MapsCollection } from '../collections';
import { expandDataForInfiniteQuery, InfiniteResponse } from '../apiLib';
import { store } from '../../store';
import { mapAdapterSlice } from '../../adapters/MapAdapter';

export const PAGE_SIZE_MAPS = 3;

type GetMapsParams = NonNullable<Parameters<typeof MapsCollection.mapsGetMaps>[0]>;

export interface GetMapsResponse {
  mapIds: number[];
  totalCount: number;
}

export const useGetMaps = createInfiniteQuery<
  InfiniteResponse<GetMapsResponse>,
  GetMapsParams,
  Error,
  number
>({
  primaryKey: 'useGetMaps',
  queryFn: async ({ queryKey: [_primaryKey, variables], pageParam: offset }) => {
    const { data } = await MapsCollection.mapsGetMaps({
      ...variables,
      limit: PAGE_SIZE_MAPS,
      offset,
    });

    if (data.maps) {
      store.dispatch(mapAdapterSlice.actions.upsertMaps(data.maps));
    }

    return expandDataForInfiniteQuery(
      {
        mapIds: (data.maps ?? []).map((p) => p.id ?? 0),
        totalCount: data.totalCount ?? 0,
      },
      offset,
      PAGE_SIZE_MAPS,
      data.totalCount,
    );
  },

  getNextPageParam: (lastPage, _pages) => {
    return lastPage.newOffset;
  },

  initialPageParam: 0,
});
