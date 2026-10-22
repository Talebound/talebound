import { createQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import {
  PbEntityGroupContent,
  PbGetMenuItemContentResponse,
} from '../../generated/api-types/data-contracts';
import { MenusCollection } from '../collections';

interface GetMenuItemContentRequest {
  menuItemId: number;
}

export const sortGetMenuItemContent = (
  contents: PbEntityGroupContent[],
): PbEntityGroupContent[] => {
  return contents.sort((a, b) => {
    const diff = a.entityGroupId! - b.entityGroupId!;
    return diff !== 0 ? diff : (a.position ?? 0) - (b.position ?? 0);
  });
};

export const useGetMenuItemContent = createQuery<
  PbGetMenuItemContentResponse,
  GetMenuItemContentRequest,
  TaleboundError
>({
  primaryKey: 'useGetMenuItemContent',
  queryFn: async ({ queryKey: [_, { menuItemId }] }) => {
    if (menuItemId === 0)
      return {
        mainGroupId: 0,
        groups: [],
        contents: [],
      };

    const { data } = await MenusCollection.menusGetMenuItemContent(menuItemId);

    return data;
  },
});
