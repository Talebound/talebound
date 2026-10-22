import { createQuery } from 'react-query-kit';
import { TagsCollection } from '../collections';
import { PbTag } from '../../generated/api-types/data-contracts';

export const useGetModuleEntityAvailableTags = createQuery<PbTag[], number>({
  primaryKey: 'useGetModuleEntityAvailableTags',
  queryFn: async ({ queryKey: [, variables] }) => {
    const { data } = await TagsCollection.tagsGetModuleEntityAvailableTags({
      moduleId: variables,
    });
    return (data.tags ?? []).sort((a, b) => (a.tag ?? '').localeCompare(b.tag ?? ''));
  },
});
