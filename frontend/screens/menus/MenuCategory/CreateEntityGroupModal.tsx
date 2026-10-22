import React, { Suspense, useCallback, useMemo } from 'react';
import Modal from '../../../components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { setNewEntityGroupData } from './menuCategorySlice';
import EntityGroupForm from './EntityGroupForm/EntityGroupForm';
import {
  CreateEntityGroupParams,
  useCreateEntityGroup,
} from '../../../api/entities/useCreateEntityGroup';
import { useUpdateEntityGroupContent } from '../../../api/entities/useUpdateEntityGroupContent';
import { useCreateEntityGroupContent } from '../../../api/entities/useCreateEntityGroupContent';

interface CreateEntityGroupModalProps {
  trigger: React.ReactNode;
  menuItemId: number;
}

const CreateEntityGroupModal: React.FC<CreateEntityGroupModalProps> = ({ trigger, menuItemId }) => {
  const dispatch = useDispatch();

  const type = useSelector((state: ReduxState) => state.menuCategory.newEntityGroupData?.type);
  const entityType = useSelector(
    (state: ReduxState) => state.menuCategory.newEntityGroupData?.entityType,
  );
  const entityIdOfType = useSelector(
    (state: ReduxState) => state.menuCategory.newEntityGroupData?.entityIdOfType,
  );
  const contentId = useSelector(
    (state: ReduxState) => state.menuCategory.newEntityGroupData?.contentId,
  );
  const startEntityGroupId = useSelector(
    (state: ReduxState) => state.menuCategory.newEntityGroupData?.startEntityGroupId,
  );
  const targetEntityGroupId = useSelector(
    (state: ReduxState) => state.menuCategory.newEntityGroupData?.targetEntityGroupId,
  );
  const targetPosition = useSelector(
    (state: ReduxState) => state.menuCategory.newEntityGroupData?.targetPosition,
  );

  const {
    mutate: createEntityGroup,
    isPending: isPendingCreate,
    error: errorCreate,
  } = useCreateEntityGroup();

  const {
    mutate: updateEntityGroupContent,
    isPending: isPendingUpdateContent,
    // isError: isErrorUpdate,
    error: errorUpdateContent,
  } = useUpdateEntityGroupContent();

  const {
    mutate: createEntityGroupContent,
    isPending: isPendingCreateContent,
    // isError: isErrorUpdate,
    error: errorCreateContent,
  } = useCreateEntityGroupContent();

  const isPending = isPendingCreate || isPendingUpdateContent || isPendingCreateContent;
  const error = errorCreate ?? errorUpdateContent ?? errorCreateContent;

  const closeModal = useCallback(() => dispatch(setNewEntityGroupData(undefined)), [dispatch]);

  const open = !!targetEntityGroupId && !!targetPosition;

  const createEntityGroupHandler = useCallback(
    (data: CreateEntityGroupParams['body']) => {
      if (targetEntityGroupId) {
        const entityGroupData: CreateEntityGroupParams['body'] = {
          ...data,
          parentEntityGroupId: targetEntityGroupId,
          position: targetPosition,
        };

        const createEntityGroupArgs = {
          menuItemId,
          startEntityGroupId,
          body: entityGroupData,
        };
        console.log('createEntityGroupArgs', createEntityGroupArgs);

        createEntityGroup(createEntityGroupArgs, {
          onSuccess: ({ data }) => {
            if (type === 'MOVE_ENTITY_CONTENT') {
              if (contentId && startEntityGroupId && data.entityGroup) {
                const updateEntityGroupContentArgs = {
                  menuItemId,
                  entityGroupId: startEntityGroupId,
                  contentId: contentId,
                  body: {
                    newEntityGroupId: data.entityGroup.id,
                    position: 1,
                  },
                };
                console.log('updateEntityGroupContentArgs', updateEntityGroupContentArgs);

                updateEntityGroupContent(updateEntityGroupContentArgs, {
                  onSuccess: closeModal,
                });
              }
            } else if (type === 'CREATE_ENTITY_CONTENT') {
              const createEntityGroupContentArgs = {
                menuItemId,
                entityGroupId: data.entityGroup?.id,
                body: {
                  position: 1,
                  entityType,
                  entityIdOfType,
                },
              };
              console.log('createEntityGroupContentArgs', createEntityGroupContentArgs);

              createEntityGroupContent(createEntityGroupContentArgs, {
                onSuccess: closeModal,
              });
            }
          },
        });
      }
    },
    [
      targetEntityGroupId,
      targetPosition,
      menuItemId,
      startEntityGroupId,
      createEntityGroup,
      type,
      contentId,
      updateEntityGroupContent,
      closeModal,
      entityType,
      entityIdOfType,
      createEntityGroupContent,
    ],
  );

  const content = useMemo(
    () =>
      open && (
        <Suspense fallback={null}>
          <EntityGroupForm
            onSubmitCallback={createEntityGroupHandler}
            submitPending={isPending}
            submitError={error}
          />
        </Suspense>
      ),
    [open, createEntityGroupHandler, isPending, error],
  );

  return (
    <Modal
      trigger={trigger}
      open={open}
      title={`Create new group`}
      content={content}
      onOpenChange={closeModal}
      size="md"
    />
  );
};

export default CreateEntityGroupModal;
