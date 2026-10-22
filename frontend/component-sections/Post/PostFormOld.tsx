import React, { useCallback, useState } from 'react';
import ContentSection from '../../components/ContentSection/ContentSection';
import Textarea from '../../components/Textarea/Textarea';
import { useInput } from '../../hooks/useInput';
import Input from '../../components/Input/Input';
import { Col, Row } from '../../components/Flex/Flex';
import Avatar from '../../components/Avatar/Avatar';
import { Label } from '../../components/Typography/Label';
import ImageModal from '../../components/ImageModal/ImageModal';
import { PbImage } from '../../generated/api-types/data-contracts';
import ErrorText from '../../components/ErrorText/ErrorText';
import { Button } from '../../components/Button/Button';
import { useCreateMenuItemPost } from '../../api/menus/useCreateMenuItemPost';

const textareaPlaceholder =
  'Short description of the post. What information does this post contain?';

interface PostFormOldProps {
  menuId?: number;
  menuItemId?: number;
  position?: number;
  canChangeTitle?: boolean;
  canChangeDescription?: boolean;
  canChangeThumbnail?: boolean;
  onFinishCallback?: () => void;
}

const PostFormOld: React.FC<PostFormOldProps> = ({
  menuId,
  menuItemId,
  position,
  canChangeTitle = true,
  canChangeDescription = true,
  canChangeThumbnail = true,
  onFinishCallback,
}) => {
  const { mutate: createMenuItemPost, isPending, error } = useCreateMenuItemPost();

  const [showImageModal, setShowImageModal] = useState(false);

  const [thumbnailImageId, setThumbnailImageId] = useState<number>();
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<string>();
  const { value: title, onChange: onChangeTitle } = useInput<string>('');
  const { value: description, onChange } = useInput<string, HTMLTextAreaElement>('');

  const toggleImageModal = useCallback(() => {
    setShowImageModal((p) => !p);
  }, []);

  const changeThumbnailImage = useCallback(
    (image: PbImage) => {
      if (canChangeThumbnail) {
        setThumbnailImageId(image.id);
        setThumbnailImageUrl(image.baseUrl);
      }
    },
    [canChangeThumbnail],
  );

  const createPostHandler = useCallback(() => {
    if (menuId && menuItemId !== undefined) {
      createMenuItemPost(
        {
          menuId,
          menuItemId,
          body: {
            title: canChangeTitle ? title : undefined,
            position,
            shortDescription: canChangeDescription ? description : undefined,
            imageThumbnailId: thumbnailImageId,
          },
        },
        {
          onSuccess: () => {
            if (onFinishCallback) onFinishCallback();
          },
        },
      );
    }
  }, [
    createMenuItemPost,
    menuId,
    menuItemId,
    position,
    canChangeTitle,
    title,
    canChangeDescription,
    description,
    thumbnailImageId,
  ]);

  const pending = isPending;

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
          <Button onClick={createPostHandler} loading={pending}>
            Create
          </Button>
          <ErrorText error={error} />
        </Col>
        {canChangeThumbnail && (
          <Col gap="md" alignItems="center" padding="xl">
            <Label css={{ width: 'auto' }}>Thumbnail</Label>
            <Avatar
              loading={pending}
              onClick={toggleImageModal}
              size="xl"
              url={thumbnailImageUrl}
            />
          </Col>
        )}
      </Row>
      <ImageModal
        open={showImageModal}
        setOpen={setShowImageModal}
        trigger={null}
        onSubmit={changeThumbnailImage}
        uploadedFilename={`post-thumbnail-menu-${menuId}`}
        uploadedImageTypeId={100}
      />
    </>
  );
};

export default PostFormOld;
