import { createQuery } from 'react-query-kit';
import { TagsCollection } from '../collections';
import { PbModuleType, PbViewTag } from '../../generated/api-types/data-contracts';

export const useGetModuleTypeAvailableTags = createQuery<PbViewTag[], PbModuleType>({
  primaryKey: 'useGetModuleTypeAvailableTags',
  queryFn: async ({ queryKey: [, variables] }) => {
    const { data } = await TagsCollection.tagsGetModuleTypeAvailableTags({
      moduleType: variables ?? PbModuleType.MODULE_TYPE_UNKNOWN,
    });
    return (data.tags ?? []).sort((a, b) => (a.tag ?? '').localeCompare(b.tag ?? ''));
  },
});
