import React, { useCallback, useMemo } from 'react';
import { Col } from '../../components/Flex/Flex';
import { useGetUserById } from '../../api/users/useGetUserById';
import { useAuth } from '../../hooks/useAuth';
import { UserProfileProps } from './UserProfile';
import { useGetPostById } from '../../api/posts/useGetPostById';
import {
  UpdateUserIntroductionRequest,
  useUpdateUserIntroduction,
} from '../../api/users/useUpdateUserIntroduction';
import Editor, { EditorOnSaveAction, PostViewType } from '../../components/Editor/Editor';
import { parseError } from '../../utils/types/error';
import { EMPTY_EDITOR_STATE } from '../../components/Editor/utils/emptyEditorState';

type UserIntroductionProps = Pick<UserProfileProps, 'userId'> & {
  postViewOnly?: boolean;
};

const UserIntroduction: React.FC<UserIntroductionProps> = ({ userId, postViewOnly = false }) => {
  const { user, isLoggedIn: _isLoggedIn } = useAuth();

  const { data: userData, isPending: isPendingUser } = useGetUserById({
    variables: userId,
  });

  const loadIntroductionData = useMemo(
    () => userData?.introductionPostId !== undefined,
    [userData?.introductionPostId],
  );

  const { data: postData, isPending: isPendingIntroduction } = useGetPostById({
    // use: [globalQueryMiddleware], //getMiddlewareEnabled(loadIntroductionData)
    variables: userData?.introductionPostId ?? 0,
  });

  const updateUserIntroduction = useUpdateUserIntroduction();

  const isPending = isPendingUser || (isPendingIntroduction && loadIntroductionData);

  const hasIntroduction = !isPending && postData?.content !== undefined;

  const isMyPost = useMemo(
    () => user?.id === userData?.id && user?.id !== undefined,
    [user?.id, userData?.id],
  );

  const onSave: EditorOnSaveAction = useCallback(
    (editorState, _editor, draft, successAction, errorAction, settleAction) => {
      const props: UpdateUserIntroductionRequest = {
        userId: userId,
        postId: userData?.introductionPostId,
        body: {
          content: JSON.stringify(editorState),
          saveAsDraft: draft,
        },
      };

      updateUserIntroduction.mutate(props, {
        onSuccess: () => {
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
    [updateUserIntroduction, userData?.introductionPostId, userId],
  );

  const editorState = useMemo(() => {
    if (!isPending && userData?.introductionPostId !== undefined) {
      return postData?.content;
    } else if (!hasIntroduction) {
      return EMPTY_EDITOR_STATE;
    } else {
      return undefined;
    }
  }, [hasIntroduction, isPending, userData?.introductionPostId, postData?.content]);

  const resetErrorHandler = useCallback(() => {
    updateUserIntroduction.reset();
  }, [updateUserIntroduction]);

  return (
    <Col fullWidth>
      <Editor
        loading={updateUserIntroduction.isPending}
        hasRightToEdit={isMyPost}
        editorState={editorState}
        disabled={false}
        editable={!postViewOnly}
        defaultPostViewType={PostViewType.POST}
        isDraft={postData?.isDraft ?? false}
        alreadyExists={postData?.id !== undefined}
        draftable={false}
        onSaveAction={onSave}
        error={parseError(updateUserIntroduction.error)}
        resetError={resetErrorHandler}
      />
    </Col>
  );
};

export default UserIntroduction;
