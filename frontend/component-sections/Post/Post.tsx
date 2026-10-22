import React, { useCallback, useMemo, useState } from 'react';
import { UpdatePostRequest, useUpdatePost } from '../../api/posts/useUpdatePost';
import Editor, { EditorOnSaveAction, PostViewType } from '../../components/Editor/Editor';
import { Col, Row } from '../../components/Flex/Flex';
import { parseError } from '../../utils/types/error';
import { Client } from 'react-hydration-provider';
import LoadingText from '../../components/Loading/LoadingText';
import { TitleH2 } from '../../components/Typography/Title';
import { Button } from '../../components/Button/Button';
import { TbAlignBoxLeftTop, TbPencil } from 'react-icons/tb';
import PostForm from './PostForm';
import ContentSection from '../../components/ContentSection/ContentSection';
import { imageModifyVariant, ImageVariant } from '../../utils/images/imageUtils';
import { usePost } from '../../hooks/usePost';
import { useImage } from '../../hooks/useImage';

interface PostProps {
  postId: number;
  canEdit: boolean;
  customTitle?: string;
  canChangeTitle?: boolean;
  canChangeDescription?: boolean;
  canChangeThumbnail?: boolean;
  showTitle?: boolean;
  isModal?: boolean;
  transparent?: boolean;
}

const Post: React.FC<PostProps> = ({
  postId,
  canEdit,
  customTitle,
  canChangeTitle,
  canChangeDescription,
  canChangeThumbnail,
  showTitle = true,
  isModal = false,
  transparent = false,
}) => {
  const [editModeDetails, setEditModeDetails] = useState(false);
  const [editModeContent, setEditModeContent] = useState(false);
  // const { data: postData, isPending: isPendingPost } = useGetPostById({
  //   variables: postId,
  // });

  const { post: postData, isFetching: isPendingPost } = usePost(postId);
  const { image: imageThumbnail } = useImage(postData?.imageThumbnailId ?? 0);
  const updatePost = useUpdatePost();

  const onSave: EditorOnSaveAction = useCallback(
    (editorState, _editor, _draft, successAction, errorAction, settleAction) => {
      const props: UpdatePostRequest = {
        postId: postId,
        body: {
          content: JSON.stringify(editorState),
        },
      };

      updatePost.mutate(props, {
        onSuccess: () => {
          console.log('TEST1');
          if (successAction) successAction();
        },
        onError: () => {
          if (errorAction) errorAction();
        },
        onSettled: () => {
          if (settleAction) settleAction();
        },
      });
    },
    [postId, updatePost],
  );

  const editorState = useMemo(() => {
    if (!isPendingPost && postId !== undefined && postData?.content !== '') {
      return postData?.content;
    }
    return undefined;
  }, [isPendingPost, postId, postData?.content]);

  const resetErrorHandler = useCallback(() => {
    updatePost.reset();
  }, [updatePost]);

  const toggleEditModeDetails = useCallback(() => {
    setEditModeDetails((p) => !p);
  }, []);

  const toggleEditModeContent = useCallback(() => {
    setEditModeContent((p) => !p);
  }, []);

  const thumbnailImage = useMemo(() => {
    const img = imageThumbnail?.url;
    if (img) return imageModifyVariant(img, ImageVariant['600x400']);
    return undefined;
  }, [imageThumbnail?.url]);

  if (isPendingPost) return <LoadingText />;

  return (
    <Client>
      <ContentSection
        flexWrap="wrap"
        direction="column"
        cornerImage={thumbnailImage}
        noMargin={isModal}
        transparent={transparent}
      >
        <Col fullWidth gap="md">
          {(showTitle || canEdit) && (
            <>
              <Row gap="md" fullWidth justifyContent="between" wrap>
                {showTitle && <TitleH2>{customTitle ?? postData?.title}</TitleH2>}
                {!showTitle && canEdit && <span />}
                {canEdit && (
                  <Row gap="md" paddingRight={isModal ? '2xl' : undefined}>
                    <Button
                      color={editModeDetails ? 'primaryFill' : 'semiGhost'}
                      onClick={toggleEditModeDetails}
                    >
                      <TbPencil />
                      Edit details
                    </Button>
                    <Button
                      color={editModeContent ? 'primaryFill' : 'semiGhost'}
                      onClick={toggleEditModeContent}
                    >
                      <TbAlignBoxLeftTop />
                      Edit content
                    </Button>
                  </Row>
                )}
              </Row>
              {editModeDetails && (
                <ContentSection flexWrap="wrap" direction="column">
                  <PostForm
                    key={`post-edit-mode-${postId}`}
                    postId={postId}
                    canChangeTitle={canChangeTitle}
                    canChangeDescription={canChangeDescription}
                    canChangeThumbnail={canChangeThumbnail}
                  />
                </ContentSection>
              )}
            </>
          )}
          <Editor
            key={postId}
            loading={updatePost.isPending}
            editable={editModeContent && canEdit}
            hasRightToEdit={editModeContent && canEdit}
            editorState={editorState}
            disabled={false}
            defaultPostViewType={PostViewType.POST}
            changedPostViewType={editModeContent ? PostViewType.EDIT : undefined}
            closeEditor={toggleEditModeContent}
            alreadyExists={postId !== undefined}
            draftable={false}
            isDraft={false}
            onSaveAction={onSave}
            error={parseError(updatePost.error)}
            resetError={resetErrorHandler}
          />
        </Col>
      </ContentSection>
    </Client>
  );
};

export default Post;
