import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { MdDragIndicator } from 'react-icons/md';
import { DragHandle } from '../MenuAdministration/menuAdministrationComponents';
import { Col, Row } from '../../../components/Flex/Flex';
import MenuCategoryEntityDropArea from './MenuCategoryEntityDropArea';
import { DropType, isOverCheck } from './menuCategoryUtils';
import { EntityGroupContentHierarchyEntity } from '../../../hooks/useGetMenuItemContentHierarchy';
import {
  PbEntityGroup,
  PbEntityGroupDirection,
  PbEntityGroupStyle,
} from '../../../generated/api-types/data-contracts';
import EntityComponent from './EntityComponent/EntityComponent';

interface MenuItemContentElementEntityProps {
  showHandles: boolean;
  content: EntityGroupContentHierarchyEntity;
  parentGroup?: PbEntityGroup;
}

const MenuItemContentElementEntity: React.FC<MenuItemContentElementEntityProps> = ({
  content,
  showHandles,
  parentGroup,
}) => {
  const editMode = useSelector((state: ReduxState) => state.menuCategory.editMode);

  const groupStyle = parentGroup?.style ?? PbEntityGroupStyle.ENTITY_GROUP_STYLE_FRAMED;
  const groupDirection =
    parentGroup?.direction ?? PbEntityGroupDirection.ENTITY_GROUP_DIRECTION_VERTICAL;

  const {
    over,
    setNodeRef: setDroppableRef,
    active,
  } = useDroppable({
    id: content.hierarchyId + '-drop_move',
    data: { ...content, dropType: DropType.MOVE },
  });

  const canDropHere =
    !content.hierarchyId.includes(`-${active?.id}-`) && content.hierarchyId !== active?.id;

  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    isDragging,
  } = useDraggable({
    id: content.hierarchyId,
    disabled: !editMode || !canDropHere,
    data: content,
  });

  const isOver = isOverCheck(content.hierarchyId, over?.id);

  if (!editMode) {
    return (
      <EntityComponent
        contentId={content.id}
        entityId={content.entityId}
        groupStyle={groupStyle}
        groupDirection={groupDirection}
      />
    );
  }

  return (
    <>
      <Col gap="sm" ref={setDroppableRef}>
        <Row justifyContent="between" semiTransparent={isDragging}>
          <EntityComponent
            contentId={content.id}
            entityId={content.entityId}
            groupStyle={groupStyle}
            groupDirection={groupDirection}
          >
            {showHandles && (
              <DragHandle ref={setDraggableRef} {...listeners} {...attributes}>
                <MdDragIndicator size={20} />
              </DragHandle>
            )}
          </EntityComponent>
        </Row>
        {canDropHere && isOver && (
          <MenuCategoryEntityDropArea content={content} groupDirection={groupDirection} />
        )}
      </Col>
    </>
  );
};

export default MenuItemContentElementEntity;
