import { usePost } from '../../hooks/usePost';
import React, { useRef, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useCreateLocationPost } from '../../api/locations/useCreateLocationPost';
import { Button } from '../../components/Button/Button';
import ErrorText from '../../components/ErrorText/ErrorText';
import PostDetailModal from '../Post/PostDetailModal';

interface LocationTablePostCellProps {
  locationId: number;
  postId?: number;
  canEdit?: boolean;
}

const LocationTablePostCell: React.FC<LocationTablePostCellProps> = ({
  locationId,
  postId,
  canEdit,
}) => {
  const { post } = usePost(postId);
  const [openedPostId, setOpenedPostId] = useState<number>();
  const creating = useRef(false);
  const { mutate: createPost, isPending, error } = useCreateLocationPost();

  const create = () => {
    if (!canEdit || postId || creating.current || isPending) return;
    creating.current = true;
    createPost(
      { locationId },
      {
        onSuccess: ({ data }) => setOpenedPostId(data.postId),
        onSettled: () => {
          creating.current = false;
        },
      },
    );
  };

  return (
    <div onClick={(event) => event.stopPropagation()}>
      {postId ? (
        <Button
          size="sm"
          color="primaryOutline"
          title={post?.title}
          css={{ maxWidth: '100%' }}
          onClick={() => setOpenedPostId(postId)}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {post?.title || 'Open post'}
          </span>
        </Button>
      ) : canEdit ? (
        <Button
          size="sm"
          color="primaryOutline"
          loading={isPending}
          disabled={isPending}
          onClick={create}
        >
          <MdAdd size={10} /> Create post
        </Button>
      ) : null}
      <ErrorText error={error} />
      <PostDetailModal
        postId={openedPostId}
        canEdit={canEdit}
        trigger={undefined}
        open={!!openedPostId}
        setOpen={(open) => {
          if (!open) setOpenedPostId(undefined);
        }}
      />
    </div>
  );
};

export default LocationTablePostCell;
