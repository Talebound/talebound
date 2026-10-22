import React from 'react';
import { useEntity } from '../../hooks/useEntity';
import { PbEntityType } from '../../generated/api-types/data-contracts';

const Post = React.lazy(() => import('../Post/Post'));
const Map = React.lazy(() => import('../Map/Map'));

interface EntityProps {
  entityId: number;
  canEdit?: boolean;
  isModal?: boolean;
}

const Entity: React.FC<EntityProps> = ({ entityId, canEdit = false, isModal = false }) => {
  const { entity } = useEntity(entityId);

  switch (entity?.type) {
    case PbEntityType.ENTITY_TYPE_POST:
      return <Post postId={entity.postId ?? 0} canEdit={canEdit} isModal={isModal} />;
    case PbEntityType.ENTITY_TYPE_MAP:
      return <Map mapId={entity.mapId ?? 0} canEdit={canEdit} isModal={isModal} />;
  }

  return <div>Entity {JSON.stringify(entity)}</div>;
};

export default Entity;
