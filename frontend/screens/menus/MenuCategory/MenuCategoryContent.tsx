import React from 'react';
import MenuItemContentElement from './MenuItemContentElement';
import { DragOverlay } from '@dnd-kit/core';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import MenuItemContentElementEntityGroup from './MenuItemContentElementEntityGroup';
import { useGetMenuItemContentHierarchy } from '../../../hooks/useGetMenuItemContentHierarchy';
import EditEntityGroupModal from './EditEntityGroupModal';
import CreateEntityGroupModal from './CreateEntityGroupModal';
import AvatarById from '../../../components/AvatarById/AvatarById';

interface MenuCategoryContentProps {
  menuItemId: number;
  isPending?: boolean;
}

const MenuCategoryContent: React.FC<MenuCategoryContentProps> = ({
  menuItemId,
  isPending = false,
}) => {
  const editMode = useSelector((state: ReduxState) => state.menuCategory.editMode);
  const draggingData = useSelector((state: ReduxState) => state.menuCategory.draggingData);
  const menuItemContent = useGetMenuItemContentHierarchy(menuItemId);

  console.log('MENU ITEM CONTENT: ', menuItemContent);

  if (!menuItemContent?.hierarchy) return null;

  return (
    <>
      {menuItemContent.hierarchy.type === 'GROUP' && (
        <MenuItemContentElementEntityGroup
          isTopLevelGroup={true}
          isPending={isPending}
          showHandles={true}
          content={menuItemContent.hierarchy}
          entityGroupObject={menuItemContent.entityGroups}
        />
      )}
      {editMode && (
        <DragOverlay>
          {draggingData?.type === 'NEW_ENTITY' && (
            <div style={{ cursor: 'grabbing' }}>
              <AvatarById imageId={draggingData.imageId} />
            </div>
          )}
          {(draggingData?.type === 'ENTITY' || draggingData?.type === 'GROUP') && (
            <div
              style={{
                width: '500px',
                opacity: 0.5,
                cursor: 'grabbing',
              }}
            >
              <MenuItemContentElement
                showHandles={false}
                content={draggingData}
                entityGroupObject={menuItemContent.entityGroups}
              />
            </div>
          )}
        </DragOverlay>
      )}
      <EditEntityGroupModal
        trigger={undefined}
        entityGroups={menuItemContent.entityGroups}
        menuItemId={menuItemId}
      />
      <CreateEntityGroupModal trigger={undefined} menuItemId={menuItemId} />
    </>
  );
};

export default MenuCategoryContent;
