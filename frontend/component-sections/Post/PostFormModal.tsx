import React, { Suspense, useCallback, useMemo } from 'react';
import Modal from '../../components/Modal/Modal';
import PostForm from './PostForm';
import { useUrlModuleId } from '../../hooks/useUrlModuleId';
import { PbPost } from '../../generated/api-types/data-contracts';

interface PostFormModalProps {
  post?: PbPost;
  trigger: React.ReactNode;
  open?: boolean;
  setOpen: (v: boolean) => void;
}

const PostFormModal: React.FC<PostFormModalProps> = ({ post, trigger, open, setOpen }) => {
  const onFinishCallback = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const moduleId = useUrlModuleId();

  const content = useMemo(
    () => (
      <Suspense fallback={null}>
        <PostForm moduleId={moduleId} postId={post?.id} onFinishCallback={onFinishCallback} />
      </Suspense>
    ),
    [moduleId, post, onFinishCallback],
  );

  return (
    <Modal
      trigger={trigger}
      open={open}
      title={post ? 'Update post' : 'Create post'}
      content={content}
      onOpenChange={setOpen}
      size="sm"
    />
  );
};

export default PostFormModal;
