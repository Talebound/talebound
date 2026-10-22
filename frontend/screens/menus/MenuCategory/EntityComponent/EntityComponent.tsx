import React, { PropsWithChildren } from 'react';
import {
  PbEntityGroupDirection,
  PbEntityGroupStyle,
  PbEntityType,
} from '../../../../generated/api-types/data-contracts';
import { useEntity } from '../../../../hooks/useEntity';
import EntityPost from './EntityPost';
import EntityMap from './EntityMap';

interface EntityComponentProps extends PropsWithChildren {
  contentId: number;
  entityId: number;
  groupStyle: PbEntityGroupStyle;
  groupDirection: PbEntityGroupDirection;
}

const EntityComponent: React.FC<EntityComponentProps> = ({
  children,
  contentId,
  entityId,
  groupDirection,
}) => {
  const { entity } = useEntity(entityId);

  switch (entity?.type) {
    case PbEntityType.ENTITY_TYPE_POST:
      return (
        <EntityPost
          contentId={contentId}
          entityId={entityId}
          postId={entity.postId ?? 0}
          groupDirection={groupDirection}
        >
          {children}
        </EntityPost>
      );
    case PbEntityType.ENTITY_TYPE_MAP:
      return (
        <EntityMap
          contentId={contentId}
          entityId={entityId}
          mapId={entity.mapId ?? 0}
          groupDirection={groupDirection}
        >
          {children}
        </EntityMap>
      );
  }

  return (
    <div style={{ width: '100px', height: '100px', border: '2px solid red' }}>
      Entity Component{entityId}
    </div>
  );
};

export default EntityComponent;
