import React, { PropsWithChildren } from 'react';
import { PbEntityGroupDirection } from '../../../../generated/api-types/data-contracts';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../../store';
import GenericEntityRowView from './GenericEntityRowView';
import GenericEntityAvatarView from './GenericEntityRowAvatarView';
import { useMap } from '../../../../hooks/useMap';

interface EntityMapProps extends PropsWithChildren {
  contentId: number;
  entityId: number;
  mapId: number;
  groupDirection: PbEntityGroupDirection;
}

const EntityMap: React.FC<EntityMapProps> = ({
  children,
  contentId,
  entityId,
  mapId,
  groupDirection,
}) => {
  const { map: mapData, isFetching: isPendingPost } = useMap(mapId);
  const mapImageId = mapData?.thumbnailImageId ?? 0;
  const editMode = useSelector((state: ReduxState) => state.menuCategory.editMode);

  if (isPendingPost) return null;

  if (groupDirection === PbEntityGroupDirection.ENTITY_GROUP_DIRECTION_VERTICAL) {
    return (
      <GenericEntityRowView
        contentId={contentId}
        entityId={entityId}
        editMode={editMode}
        avatarImageId={mapImageId}
        title={mapData?.title}
        editModeInfo={`(Map #${mapId})`}
      >
        {children}
      </GenericEntityRowView>
    );
  }

  return (
    <GenericEntityAvatarView
      contentId={contentId}
      entityId={entityId}
      editMode={editMode}
      avatarImageId={mapImageId}
      title={mapData?.title}
      editModeInfo={`(Map #${mapId})`}
    >
      {children}
    </GenericEntityAvatarView>
  );
};

export default EntityMap;
