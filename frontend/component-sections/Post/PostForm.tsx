import React, { useCallback, useState } from 'react';
import Textarea from '../../components/Textarea/Textarea';
import { useInput } from '../../hooks/useInput';
import Input from '../../components/Input/Input';
import { Col, Row } from '../../components/Flex/Flex';
import Avatar from '../../components/Avatar/Avatar';
import { IMAGE_DEFAULT_WORLD_THUMBNAIL } from '../../utils/images/imageDefaultUrls';
import { Label } from '../../components/Typography/Label';
import ImageModal from '../../components/ImageModal/ImageModal';
import { useUpdatePost } from '../../api/posts/useUpdatePost';
import ErrorText from '../../components/ErrorText/ErrorText';
import { Button } from '../../components/Button/Button';
import { usePost } from '../../hooks/usePost';
import { useImage } from '../../hooks/useImage';
import { useCreatePost } from '../../api/posts/useCreatePost';
import { PbImage } from '../../generated/api-types/data-contracts';

const textareaPlaceholder =
  'Short description of the post. What information does this post contain?';

interface PostFormProps {
  moduleId?: number;
  postId?: number;
  canChangeTitle?: boolean;
  canChangeDescription?: boolean;
  canChangeThumbnail?: boolean;
  onFinishCallback?: () => void;
}

const PostForm: React.FC<PostFormProps> = ({
  moduleId,
  postId,
  canChangeTitle = true,
  canChangeDescription = true,
  canChangeThumbnail = true,
  onFinishCallback,
}) => {
  const { mutate: createPost, isPending: isPendingCreate, error: errorCreate } = useCreatePost();
  const { mutate: updatePost, isPending: isPendingUpdate, error: errorUpdate } = useUpdatePost();
  const [showImageModal, setShowImageModal] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState<PbImage>();
  const { post: postData, isFetching: isPendingPost } = usePost(postId);
  const { image: imageThumbnail } = useImage(postData?.imageThumbnailId ?? 0);

  const { value: title, onChange: onChangeTitle } = useInput<string>(postData?.title ?? '');
  const { value: description, onChange } = useInput<string, HTMLTextAreaElement>(
    postData?.description ?? '',
  );

  const toggleImageModal = useCallback(() => {
    setShowImageModal((p) => !p);
  }, []);

  const onSuccess = useCallback(() => {
    if (onFinishCallback) {
      onFinishCallback();
    }
  }, [onFinishCallback]);

  const submitPostHandler = useCallback(() => {
    if (postId) {
      updatePost(
        {
          postId,
          body: {
            title: canChangeTitle ? title : undefined,
            description: canChangeDescription ? description : undefined,
            imageThumbnailId: thumbnailImage?.id,
          },
        },
        { onSuccess },
      );
    } else {
      createPost(
        {
          moduleId,
          title: canChangeTitle ? title : undefined,
          description: canChangeDescription ? description : undefined,
          imageThumbnailId: thumbnailImage?.id,
          isDraft: true,
        },
        { onSuccess },
      );
    }
  }, [
    canChangeDescription,
    canChangeTitle,
    createPost,
    description,
    moduleId,
    onSuccess,
    postId,
    thumbnailImage?.id,
    title,
    updatePost,
  ]);

  const loading = isPendingPost || isPendingCreate || isPendingUpdate;

  if (!canChangeTitle && !canChangeDescription && !canChangeThumbnail) return null;

  return (
    <>
      <Row fullWidth gap="md" alignItems="start">
        <Col fullWidth gap="md">
          {canChangeTitle && (
            <Input
              id="title"
              label="Title"
              onChange={onChangeTitle}
              value={title}
              required
              fullWidth
            />
          )}
          {canChangeDescription && (
            <Textarea
              id="description"
              label="Short description"
              placeholder={textareaPlaceholder}
              rows={5}
              value={description}
              onChange={onChange}
            />
          )}
          <Button onClick={submitPostHandler} loading={loading}>
            {postId ? 'Save' : 'Create'}
          </Button>
          <ErrorText error={errorCreate ?? errorUpdate} />
        </Col>
        {canChangeThumbnail && (
          <Col gap="md" alignItems="center" padding="xl">
            <Label css={{ width: 'auto' }}>Thumbnail</Label>
            <Avatar
              loading={loading}
              onClick={toggleImageModal}
              size="xl"
              url={thumbnailImage?.url ?? imageThumbnail?.url ?? IMAGE_DEFAULT_WORLD_THUMBNAIL}
            />
          </Col>
        )}
      </Row>
      <ImageModal
        open={showImageModal}
        setOpen={setShowImageModal}
        trigger={null}
        onSubmit={setThumbnailImage}
        uploadedFilename={`post-thumbnail-${postId}`}
        uploadedImageTypeId={100}
        isNullable={true}
      />
    </>
  );
};

export default PostForm;
