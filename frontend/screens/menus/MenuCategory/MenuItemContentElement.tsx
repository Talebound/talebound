import React from 'react';
import MenuItemContentElementEntity from './MenuItemContentElementEntity';
import MenuItemContentElementEntityGroup from './MenuItemContentElementEntityGroup';
import {
  EntityGroupContentHierarchy,
  EntityGroupObject,
  getEntityParentGroupId,
} from '../../../hooks/useGetMenuItemContentHierarchy';

interface MenuItemContentElementProps {
  showHandles: boolean;
  content: EntityGroupContentHierarchy;
  entityGroupObject: EntityGroupObject;
}

const MenuItemContentElement: React.FC<MenuItemContentElementProps> = ({
  showHandles,
  content,
  entityGroupObject,
}) => {
  switch (content.type) {
    case 'ENTITY':
      return (
        <MenuItemContentElementEntity
          showHandles={showHandles}
          content={content}
          parentGroup={entityGroupObject[getEntityParentGroupId(content)]}
        />
      );
    case 'GROUP':
      return (
        <MenuItemContentElementEntityGroup
          showHandles={showHandles}
          content={content}
          entityGroupObject={entityGroupObject}
        />
      );
  }
};

export default MenuItemContentElement;
