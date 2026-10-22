import React, { PropsWithChildren } from 'react';
import { PbEntityGroupDirection } from '../../../../generated/api-types/data-contracts';
import { usePost } from '../../../../hooks/usePost';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../../store';
import GenericEntityRowView from './GenericEntityRowView';
import GenericEntityAvatarView from './GenericEntityRowAvatarView';

interface EntityPostProps extends PropsWithChildren {
  contentId: number;
  entityId: number;
  postId: number;
  groupDirection: PbEntityGroupDirection;
}

const EntityPost: React.FC<EntityPostProps> = ({
  children,
  contentId,
  entityId,
  postId,
  groupDirection,
}) => {
  const { post: postData, isFetching: isPendingPost } = usePost(postId);
  const postImageId = postData?.imageThumbnailId ?? 0;
  const editMode = useSelector((state: ReduxState) => state.menuCategory.editMode);

  if (isPendingPost) return null;

  if (groupDirection === PbEntityGroupDirection.ENTITY_GROUP_DIRECTION_VERTICAL) {
    return (
      <GenericEntityRowView
        contentId={contentId}
        entityId={entityId}
        editMode={editMode}
        avatarImageId={postImageId}
        title={postData?.title}
        editModeInfo={`(Post #${postId})`}
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
      avatarImageId={postImageId}
      title={postData?.title}
      editModeInfo={`(Post #${postId})`}
    >
      {children}
    </GenericEntityAvatarView>
  );
};

export default EntityPost;
