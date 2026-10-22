import { createInfiniteQuery } from 'react-query-kit';
import { LocationsCollection } from '../collections';
import { expandDataForInfiniteQuery, InfiniteResponse } from '../apiLib';
import { store } from '../../store';
import { locationAdapterSlice } from '../../adapters/LocationAdapter';

export const PAGE_SIZE_POSTS = 3;

type GetLocationsParams = NonNullable<
  Parameters<typeof LocationsCollection.locationsGetLocations>[0]
>;

export interface GetLocationsResponse {
  locationIds: number[];
  totalCount: number;
}

export const useGetLocations = createInfiniteQuery<
  InfiniteResponse<GetLocationsResponse>,
  GetLocationsParams,
  Error,
  number
>({
  primaryKey: 'useGetLocations',
  queryFn: async ({ queryKey: [_primaryKey, variables], pageParam: offset }) => {
    const { data } = await LocationsCollection.locationsGetLocations({
      ...variables,
      limit: PAGE_SIZE_POSTS,
      offset,
    });

    if (data.locations) {
      store.dispatch(locationAdapterSlice.actions.upsertLocations(data.locations));
    }

    return expandDataForInfiniteQuery(
      {
        locationIds: (data.locations ?? []).map((p) => p.id ?? 0),
        totalCount: data.totalCount ?? 0,
      },
      offset,
      PAGE_SIZE_POSTS,
      data.totalCount,
    );
  },

  getNextPageParam: (lastPage, _pages) => {
    return lastPage.newOffset;
  },

  initialPageParam: 0,
});
