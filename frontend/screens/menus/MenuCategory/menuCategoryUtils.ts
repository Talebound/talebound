import { UniqueIdentifier } from '@dnd-kit/core';

export enum DropType {
  MOVE = 'move',
  NEW_GROUP = 'new_group',
}

export const isOverCheck = (
  contentHierarchyId: string,
  overId: UniqueIdentifier | undefined,
): boolean =>
  (
    [
      contentHierarchyId + '-drop_move',
      contentHierarchyId + '-drop_new_group',
    ] as UniqueIdentifier[]
  ).includes(overId ?? '');
