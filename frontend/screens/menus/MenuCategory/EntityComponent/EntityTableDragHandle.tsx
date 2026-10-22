import React from 'react';
import { PbEntityType } from '../../../../generated/api-types/data-contracts';
import { useDraggable } from '@dnd-kit/core';
import { MdDragIndicator } from 'react-icons/md';
import { DragHandle } from '../../MenuAdministration/menuAdministrationComponents';

interface EntityTableDragHandleProps {
  entityType: PbEntityType;
  entityId: number;
  imageId?: number;
}

const EntityTableDragHandle: React.FC<EntityTableDragHandleProps> = ({
  entityType,
  entityId,
  imageId,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    isDragging,
  } = useDraggable({
    id: `${entityId}_${entityType}_new-entity`,
    disabled: false,
    data: {
      type: 'NEW_ENTITY',
      entityType,
      entityId,
      imageId,
    },
  });

  return (
    <DragHandle ref={setDraggableRef} {...listeners} {...attributes}>
      <MdDragIndicator size={20} />
    </DragHandle>
  );
};

export default EntityTableDragHandle;
