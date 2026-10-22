import { useGetMenuItemContent } from '../api/menus/useGetMenuItemContent';
import { PbEntityGroup, PbEntityGroupContent } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';

export type EntityGroupContentHierarchyEntityGroup = {
  id: number;
  type: 'GROUP';
  hierarchyId: string;
  entityGroupId: number;
  position: number;
  children: EntityGroupContentHierarchy[];
};

export type EntityGroupContentHierarchyEntity = {
  id: number;
  type: 'ENTITY';
  hierarchyId: string;
  entityId: number;
  position: number;
};

export const getEntityParentGroupId = (e: EntityGroupContentHierarchyEntity) => {
  const lastGroupId = e.hierarchyId
    .split('-')
    .findLast((s) => s[0] === 'g')
    ?.slice(1);
  if (lastGroupId) return parseInt(lastGroupId);
  return -1;
};

export type EntityGroupContentHierarchy =
  | EntityGroupContentHierarchyEntityGroup
  | EntityGroupContentHierarchyEntity;

export type EntityGroupObject = Record<number, PbEntityGroup | undefined>;

export type MenuItemContentHierarchy = {
  entityGroups: EntityGroupObject;
  hierarchy: EntityGroupContentHierarchyEntityGroup;
};

const emptyResponse: MenuItemContentHierarchy = {
  entityGroups: {},
  hierarchy: {
    id: 0,
    type: 'GROUP',
    hierarchyId: 'g0',
    entityGroupId: 0,
    position: 1,
    children: [],
  },
};

export const useGetMenuItemContentHierarchy = (menuItemId: number): MenuItemContentHierarchy => {
  const { data: menuItemContent } = useGetMenuItemContent({
    variables: { menuItemId },
  });

  return useMemo(() => {
    const rsp: MenuItemContentHierarchy = { ...emptyResponse };
    if (menuItemContent) {
      const obj: Record<string, EntityGroupContentHierarchy | undefined> = {};

      const getId = (egc: PbEntityGroupContent) =>
        egc.contentEntityId ? `e${egc.contentEntityId}` : `g${egc.contentEntityGroupId}`;

      const topLevelId = menuItemContent.mainGroupId ?? 0;

      const topLevelHierarchyId = `g${topLevelId}`;
      obj[topLevelHierarchyId] = {
        id: 0,
        type: 'GROUP',
        hierarchyId: topLevelHierarchyId,
        entityGroupId: topLevelId,
        position: 1,
        children: [],
      };

      const queue = [topLevelId];
      while (queue.length > 0) {
        const groupId = queue.shift();
        if (!groupId) break;

        const group = obj[`g${groupId}`];
        if (!group) break;

        const groupChildren =
          menuItemContent?.contents?.filter((c) => c.entityGroupId === groupId) ?? [];
        groupChildren.forEach((c) => {
          if (!c.id) return;
          const cId = getId(c);
          const cHierarchyId = `c${c.id}-${group.hierarchyId}-${cId}`;
          if (c.contentEntityId) {
            obj[cId] = {
              id: c.id,
              type: 'ENTITY',
              hierarchyId: cHierarchyId,
              entityId: c.contentEntityId,
              position: c.position ?? 1,
            };
          } else if (c.contentEntityGroupId) {
            obj[cId] = {
              id: c.id,
              type: 'GROUP',
              hierarchyId: cHierarchyId,
              entityGroupId: c.contentEntityGroupId,
              position: c.position ?? 1,
              children: [],
            };
            queue.push(c.contentEntityGroupId);
          }

          const thisObj = obj[cId];
          if (group.type === 'GROUP' && thisObj) {
            group.children.push(thisObj);
          }
        });
      }

      const mainHierarchy = obj[topLevelHierarchyId];
      if (mainHierarchy?.type === 'GROUP') rsp.hierarchy = mainHierarchy;

      menuItemContent.groups?.forEach((g) => {
        console.log('G', g);
        if (g.id) rsp.entityGroups[g.id] = g;
      });
    }

    return rsp;
  }, [menuItemContent]);
};
