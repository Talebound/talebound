import React, { Suspense, useMemo } from 'react';
import Modal from '../../components/Modal/Modal';
import LoadingText from '../../components/Loading/LoadingText';

const Post = React.lazy(() => import('./Post'));

interface PostDetailModalProps {
  canEdit?: boolean;
  postId?: number;
  trigger: React.ReactNode;
  open?: boolean;
  setOpen?: (v: boolean) => void;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({
  canEdit = false,
  postId,
  trigger,
  open,
  setOpen,
}) => {
  const content = useMemo(
    () =>
      postId ? (
        <Suspense fallback={<LoadingText />}>
          <Post key={postId} postId={postId} canEdit={canEdit} isModal={true} />
        </Suspense>
      ) : undefined,
    [canEdit, postId],
  );

  return (
    <Modal
      noPadding
      size="md"
      trigger={trigger}
      open={open}
      content={content}
      onOpenChange={setOpen}
    />
  );
};

export default PostDetailModal;
