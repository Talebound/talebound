import React, { useCallback, useMemo } from 'react';
import ContentSection from '../../../components/ContentSection/ContentSection';
import MenuItemContentElement from './MenuItemContentElement';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { DragHandle } from '../MenuAdministration/menuAdministrationComponents';
import { MdClose, MdDragIndicator, MdEdit, MdPlaylistRemove } from 'react-icons/md';
import { TitleH2 } from '../../../components/Typography/Title';
import { Col, Flex, Row } from '../../../components/Flex/Flex';
import MenuCategoryEntityDropArea from './MenuCategoryEntityDropArea';
import { DropType, isOverCheck } from './menuCategoryUtils';
import {
  EntityGroupContentHierarchyEntityGroup,
  EntityGroupObject,
} from '../../../hooks/useGetMenuItemContentHierarchy';
import { Button } from '../../../components/Button/Button';
import {
  PbDeleteEntityGroupContentAction,
  PbEntityGroupDirection,
  PbEntityGroupStyle,
} from '../../../generated/api-types/data-contracts';
import { setEditEntityGroupId } from './menuCategorySlice';
import { useDeleteEntityGroup } from '../../../api/entities/useDeleteEntityGroup';
import ErrorText from '../../../components/ErrorText/ErrorText';

interface MenuItemContentElementEntityGroupProps {
  content: EntityGroupContentHierarchyEntityGroup;
  entityGroupObject: EntityGroupObject;
  showHandles: boolean;
  isTopLevelGroup?: boolean;
  isPending?: boolean;
}

const MenuItemContentElementEntityGroup: React.FC<MenuItemContentElementEntityGroupProps> = ({
  content,
  entityGroupObject,
  showHandles,
  isTopLevelGroup = false,
  isPending,
}) => {
  const dispatch = useDispatch();
  const editMode = useSelector((state: ReduxState) => state.menuCategory.editMode);
  const menuItemId = useSelector((state: ReduxState) => state.menuCategory.menuItemId);

  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    isDragging,
    active,
  } = useDraggable({
    id: content.hierarchyId,
    data: content,
    disabled: !editMode,
  });

  const {
    mutate: deleteEntityGroup,
    isPending: isPendingDelete,
    error: errorDelete,
  } = useDeleteEntityGroup();

  const canDropHere =
    !content.hierarchyId.includes(`-${active?.id}-`) && content.hierarchyId !== active?.id;

  const { over, setNodeRef: setDroppableRef } = useDroppable({
    id: content.hierarchyId + '-drop_move',
    disabled: !canDropHere,
    data: { ...content, dropType: DropType.MOVE },
  });

  const children = useMemo(
    () => (
      <Flex
        fullWidth
        gap="sm"
        wrap
        direction={
          // editMode ||
          entityGroupObject[content.entityGroupId]?.direction ===
          PbEntityGroupDirection.ENTITY_GROUP_DIRECTION_VERTICAL
            ? 'column'
            : 'row'
        }
      >
        {content.children
          .toSorted((a, b) => a.position - b.position)
          .map((c) => (
            <MenuItemContentElement
              key={c.id}
              showHandles={showHandles}
              content={c}
              entityGroupObject={entityGroupObject}
            />
          ))}
      </Flex>
    ),
    [entityGroupObject, content.entityGroupId, content.children, showHandles],
  );

  const dragHandle = useMemo(
    () =>
      editMode && !isTopLevelGroup && showHandles ? (
        <DragHandle ref={setDraggableRef} {...listeners} {...attributes}>
          <MdDragIndicator size={20} />
        </DragHandle>
      ) : null,
    [isTopLevelGroup, showHandles, attributes, listeners, editMode, setDraggableRef],
  );

  const isOver = isOverCheck(content.hierarchyId, over?.id);

  const handleRemoveGroup = useCallback(
    (deleteType: PbDeleteEntityGroupContentAction) => {
      deleteEntityGroup({
        menuItemId,
        entityGroupId: content.entityGroupId,
        deleteType,
      });
    },
    [content.entityGroupId, deleteEntityGroup, menuItemId],
  );

  const handleEditGroup = useCallback(
    () => dispatch(setEditEntityGroupId(content.entityGroupId)),
    [content.entityGroupId, dispatch],
  );

  const handleRemoveGroupButKeepEntities = useCallback(
    () => handleRemoveGroup(PbDeleteEntityGroupContentAction.DELETE_EGC_ACTION_MOVE_CHILDREN),
    [handleRemoveGroup],
  );

  const handleRemoveGroupAndItsEntities = useCallback(
    () => handleRemoveGroup(PbDeleteEntityGroupContentAction.DELETE_EGC_ACTION_DELETE_CHILDREN),
    [handleRemoveGroup],
  );

  const entityGroupName = entityGroupObject[content.entityGroupId]?.name ?? '';
  const entityGroupStyle = entityGroupObject[content.entityGroupId]?.style;
  const displayGroupName = editMode || entityGroupName.length > 0;

  return (
    <ContentSection
      direction={'column'}
      highlighted={false}
      fullWidth={!isTopLevelGroup}
      noMargin={
        !isTopLevelGroup ||
        (!editMode && entityGroupStyle === PbEntityGroupStyle.ENTITY_GROUP_STYLE_NOT_FRAMED)
      }
      noPadding={!editMode && entityGroupStyle === PbEntityGroupStyle.ENTITY_GROUP_STYLE_NOT_FRAMED}
      semiTransparent={isDragging || isPending || isPendingDelete}
      hasShadow={editMode || entityGroupStyle === PbEntityGroupStyle.ENTITY_GROUP_STYLE_FRAMED}
    >
      {displayGroupName && (
        <Col gap="sm" fullWidth ref={setDroppableRef}>
          <Row justifyContent="between" semiTransparent={isDragging}>
            <Row gap="sm">
              {dragHandle}
              <TitleH2 marginBottom="none">
                {editMode && entityGroupName.length === 0 ? <i>(Empty title)</i> : null}
                {entityGroupName}
              </TitleH2>
            </Row>
            {editMode && (
              <Row gap="sm">
                <Button
                  icon
                  onClick={handleEditGroup}
                  size="sm"
                  color="primaryOutline"
                  title="Edit group"
                >
                  <MdEdit />
                </Button>
                {!isTopLevelGroup && (
                  <>
                    <Button
                      icon
                      onClick={handleRemoveGroupAndItsEntities}
                      size="sm"
                      color="dangerOutline"
                      title="Remove with entities"
                    >
                      <MdPlaylistRemove />
                    </Button>
                    <Button
                      icon
                      onClick={handleRemoveGroupButKeepEntities}
                      size="sm"
                      color="dangerOutline"
                      title="Remove only group, entities will go to parent"
                    >
                      <MdClose />
                    </Button>
                  </>
                )}
              </Row>
            )}
          </Row>
          <ErrorText error={errorDelete} />
          {canDropHere && isOver && (
            <MenuCategoryEntityDropArea
              content={content}
              groupDirection={PbEntityGroupDirection.ENTITY_GROUP_DIRECTION_VERTICAL}
            />
          )}
        </Col>
      )}
      {children}
    </ContentSection>
  );
};

export default MenuItemContentElementEntityGroup;
