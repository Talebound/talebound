import { createInfiniteQuery } from 'react-query-kit';
import { PbGetQuestsResponse } from '../../generated/api-types/data-contracts';
import { QuestsCollection } from '../collections';
import { expandDataForInfiniteQuery, InfiniteResponse, OmitLimitOffset } from '../apiLib';

const PAGE_SIZE = 4;

export const useGetQuests = createInfiniteQuery<
  InfiniteResponse<PbGetQuestsResponse>,
  OmitLimitOffset<typeof QuestsCollection.questsGetQuests>,
  Error,
  number
>({
  queryKey: ['useGetQuests'],
  fetcher: async (variables, { pageParam: offset }) => {
    const tags = (variables.tags?.length ?? 0) > 0 ? variables.tags : undefined;

    const { data } = await QuestsCollection.questsGetQuests({
      worldId: variables.worldId,
      systemId: variables.systemId,
      public: variables.public,
      orderBy: variables.orderBy,
      canJoin: variables.canJoin,
      status: variables.status,
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
