import { createInfiniteQuery } from 'react-query-kit';
import { PbGetCharactersResponse } from '../../generated/api-types/data-contracts';
import { CharactersCollection } from '../collections';
import { expandDataForInfiniteQuery, InfiniteResponse, OmitLimitOffset } from '../apiLib';

const PAGE_SIZE = 4;

export const useGetCharacters = createInfiniteQuery<
  InfiniteResponse<PbGetCharactersResponse>,
  OmitLimitOffset<typeof CharactersCollection.charactersGetCharacters>,
  Error,
  number
>({
  primaryKey: 'useGetCharacters',
  queryFn: async ({ queryKey: [_primaryKey, variables], pageParam: offset }) => {
    const tags = (variables.tags?.length ?? 0) > 0 ? variables.tags : undefined;

    const { data } = await CharactersCollection.charactersGetCharacters({
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
