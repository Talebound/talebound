import React, { Suspense, useCallback, useEffect, useMemo } from 'react';
import { useGetMenuItems } from '../../../api/menus/useGetMenuItems';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { Col, Row } from '../../../components/Flex/Flex';
import { Button } from '../../../components/Button/Button';
import LoadingText from '../../../components/Loading/LoadingText';
import ErrorText from '../../../components/ErrorText/ErrorText';
import MenuCategoryContent from './MenuCategoryContent';
import { DndContext, DragEndEvent, DragStartEvent, pointerWithin } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import {
  MenuCategoryDraggingData,
  setDraggingData,
  setEditMode,
  setMenuData,
  setNewEntityGroupData,
} from './menuCategorySlice';
import { DropType } from './menuCategoryUtils';
import { EntityGroupContentHierarchy } from '../../../hooks/useGetMenuItemContentHierarchy';
import { MdEdit } from 'react-icons/md';
import { useUpdateEntityGroupContent } from '../../../api/entities/useUpdateEntityGroupContent';
import EntityChoice from './EntityComponent/EntityChoice';
import { useCreateEntityGroupContent } from '../../../api/entities/useCreateEntityGroupContent';
import Entity from '../../../component-sections/Entity/Entity';

const Post = React.lazy(() => import('../../../component-sections/Post/Post'));

interface MenuCategoryProps {
  menuItemCode: string;
  menuId: number;
  entityId?: number;
  worldImageThumbnail?: string;
  canEdit?: boolean;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({
  menuItemCode,
  menuId,
  entityId,
  worldImageThumbnail,
  canEdit = false,
}) => {
  const dispatch = useDispatch();
  const editMode = useSelector((state: ReduxState) => state.menuCategory.editMode);
  const { data: menuItemsData = [] } = useGetMenuItems({ variables: menuId });

  const {
    mutate: createEntityGroupContent,
    isPending: isPendingCreateGroupContent,
    // isError: isErrorUpdate,
    error: errorCreateGroupContent,
  } = useCreateEntityGroupContent();

  const {
    mutate: updateEntityGroupContent,
    isPending: isPendingUpdateGroupContent,
    // isError: isErrorUpdate,
    error: errorUpdateGroupContent,
  } = useUpdateEntityGroupContent();

  const menuItem = useMemo(() => {
    return menuItemsData.find((item) => item.code === menuItemCode);
  }, [menuItemCode, menuItemsData]);

  const descriptionPostId = useMemo(() => {
    return menuItem?.descriptionPostId ?? 0;
  }, [menuItem?.descriptionPostId]);

  const displayPostId = useMemo(() => {
    if (!entityId) return descriptionPostId;
    return 0;
  }, [descriptionPostId, entityId]);

  const createDescriptionPostHandler = useCallback(() => {}, []);

  const toggleEditMode = useCallback(() => {
    dispatch(setEditMode(!editMode));
  }, [dispatch, editMode]);

  //====================================================================================================
  const error = errorUpdateGroupContent ?? errorCreateGroupContent;
  //====================================================================================================

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      dispatch(setDraggingData(active.data.current as MenuCategoryDraggingData));
      console.log('START!', event.active.rect.current.initial, active);
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(
      setMenuData({
        menuId: menuId,
        menuItemId: menuItem?.id ?? 0,
      }),
    );
  }, [dispatch, menuId, menuItem?.id]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active: start, over: end } = event;
      dispatch(setDraggingData(undefined));
      console.log('START:', start, 'END:', end);

      if (end === null) return;

      /*
        -2 => incorrect value
        -1 => doesn't have parent (going to be new entity)
       */
      const getParentId = (x: EntityGroupContentHierarchy, startOrEnd: 'start' | 'end'): number => {
        const hierarchyIdSplit = (
          startOrEnd === 'end' && x.type === 'GROUP'
            ? x.hierarchyId
            : x.hierarchyId.substring(0, x.hierarchyId.lastIndexOf('-'))
        ).split('g');

        return parseInt(hierarchyIdSplit[hierarchyIdSplit.length - 1]);
      };

      const s = start.data.current as MenuCategoryDraggingData; // EntityGroupContentHierarchy;
      const e = end.data.current as EntityGroupContentHierarchy & { dropType: DropType };

      const eParentId = getParentId(e, 'end');
      let ePosition = e.type === 'GROUP' ? 1 : e.position + 1;

      console.log('s', s, 'e', e, ePosition);

      if (!s) return;
      if (s.type === 'NEW_ENTITY') {
        console.log("inside of s.type === 'NEW_ENTITY'");
        if (e.dropType === DropType.NEW_GROUP) {
          dispatch(
            setNewEntityGroupData({
              type: 'CREATE_ENTITY_CONTENT',
              entityType: s.entityType,
              entityIdOfType: s.entityId,
              targetEntityGroupId: eParentId,
              targetPosition: ePosition,
            }),
          );
        } else if (e.dropType === DropType.MOVE) {
          console.log('e.dropType === DropType.MOVE');
          createEntityGroupContent({
            menuItemId: menuItem?.id ?? 0,
            entityGroupId: eParentId,
            body: {
              position: ePosition,
              entityType: s.entityType,
              entityIdOfType: s.entityId,
            },
          });
        }
      } else {
        const sParentId = getParentId(s, 'start');

        if (sParentId === eParentId && e.type !== 'GROUP' && s.position <= e.position) ePosition--;

        if (e.dropType === DropType.NEW_GROUP) {
          dispatch(
            setNewEntityGroupData({
              type: 'MOVE_ENTITY_CONTENT',
              contentId: s.id,
              startEntityGroupId: sParentId,
              startPosition: s.position,
              targetEntityGroupId: eParentId,
              targetPosition: ePosition,
            }),
          );
          return;
        } else if (e.dropType === DropType.MOVE) {
          updateEntityGroupContent({
            menuItemId: menuItem?.id ?? 0,
            entityGroupId: sParentId,
            contentId: s.id,
            body: {
              newEntityGroupId: eParentId,
              position: ePosition,
            },
          });
        }
      }
    },
    [createEntityGroupContent, dispatch, menuItem?.id, updateEntityGroupContent],
  );

  if (!menuItem) {
    return (
      <div>
        {JSON.stringify(menuItemsData)} {menuId} 404 - not found!
      </div>
    );
  }

  return (
    <>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={pointerWithin}
      >
        <Row gap="md" alignItems="start" wrap id="content">
          <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
            {editMode && (
              <EntityChoice moduleImageThumbnail={worldImageThumbnail} canEdit={canEdit} />
            )}
            {!editMode && (
              <>
                {canEdit && descriptionPostId === 0 && (
                  <ContentSection
                    flexWrap="wrap"
                    direction="column"
                    cornerImage={worldImageThumbnail}
                  >
                    <Button onClick={createDescriptionPostHandler}>Create description post</Button>
                  </ContentSection>
                )}
                {displayPostId === 0 && entityId && (
                  <Suspense fallback={<LoadingText />}>
                    <Entity entityId={entityId} canEdit={canEdit} />
                  </Suspense>
                )}
                {displayPostId > 0 && (
                  <Suspense fallback={<LoadingText />}>
                    <Post
                      customTitle={descriptionPostId === displayPostId ? menuItem.name : undefined}
                      postId={displayPostId}
                      canEdit={canEdit}
                    />
                  </Suspense>
                )}
              </>
            )}
          </Col>

          <Col gap="sm" css={{ flexGrow: 0, flexBasis: '600px' }}>
            <MenuCategoryContent
              menuItemId={menuItem?.id ?? 0}
              isPending={isPendingUpdateGroupContent || isPendingCreateGroupContent}
            />
            <ErrorText error={error} />
            {canEdit && (
              <Row gap="md" fullWidth justifyContent="center">
                <Button
                  color={editMode ? 'primaryFill' : 'primaryOutline'}
                  onClick={toggleEditMode}
                >
                  <MdEdit />
                  Edit mode
                </Button>
              </Row>
            )}
          </Col>
        </Row>
      </DndContext>
    </>
  );
};

export default MenuCategory;
