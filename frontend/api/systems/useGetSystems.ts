import { createInfiniteQuery } from 'react-query-kit';
import { PbGetSystemsResponse } from '../../generated/api-types/data-contracts';
import { SystemsCollection } from '../collections';
import { expandDataForInfiniteQuery, InfiniteResponse, OmitLimitOffset } from '../apiLib';

const PAGE_SIZE = 4;

export const useGetSystems = createInfiniteQuery<
  InfiniteResponse<PbGetSystemsResponse>,
  OmitLimitOffset<typeof SystemsCollection.systemsGetSystems>,
  Error,
  number
>({
  primaryKey: 'useGetSystems',
  queryFn: async ({ queryKey: [_primaryKey, variables], pageParam: offset }) => {
    const tags = (variables.tags?.length ?? 0) > 0 ? variables.tags : undefined;

    const { data } = await SystemsCollection.systemsGetSystems({
      public: variables.public,
      orderBy: variables.orderBy,
      tags,
      limit: PAGE_SIZE,
      offset,
    });

    return expandDataForInfiniteQuery(data, offset, PAGE_SIZE, data.totalCount);
  },

  getNextPageParam: (lastPage, _pages) => {
    return lastPage.newOffset;
  },

  initialPageParam: 0,
});
