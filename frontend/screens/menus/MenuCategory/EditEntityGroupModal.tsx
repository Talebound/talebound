import React, { Suspense, useCallback, useMemo } from 'react';
import Modal from '../../../components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { setEditEntityGroupId } from './menuCategorySlice';
import { EntityGroupObject } from '../../../hooks/useGetMenuItemContentHierarchy';
import EntityGroupForm from './EntityGroupForm/EntityGroupForm';
import {
  UpdateEntityGroupParams,
  useUpdateEntityGroup,
} from '../../../api/entities/useUpdateEntityGroup';

interface EditEntityGroupModalProps {
  trigger: React.ReactNode;
  entityGroups: EntityGroupObject;
  menuItemId: number;
}

const EditEntityGroupModal: React.FC<EditEntityGroupModalProps> = ({
  trigger,
  entityGroups,
  menuItemId,
}) => {
  const dispatch = useDispatch();
  const editEntityGroupId = useSelector(
    (state: ReduxState) => state.menuCategory.editEntityGroupId,
  );

  const {
    mutate: updateEntityGroup,
    isPending: isPendingUpdate,
    // isError: isErrorUpdate,
    error: errorUpdate,
  } = useUpdateEntityGroup();

  const entityGroup = editEntityGroupId !== undefined ? entityGroups[editEntityGroupId] : undefined;

  const closeModal = useCallback(() => dispatch(setEditEntityGroupId(undefined)), [dispatch]);

  const updateEntityGroupHandler = useCallback(
    (data: UpdateEntityGroupParams['body']) => {
      const entityGroupData = {
        name: data.name,
        description: data.description,
        style: data.style,
        direction: data.direction,
      };

      if (entityGroup?.id) {
        updateEntityGroup(
          {
            menuItemId,
            entityGroupId: entityGroup.id,
            body: entityGroupData,
          },
          { onSuccess: closeModal },
        );
      }
    },
    [entityGroup?.id, updateEntityGroup, menuItemId, closeModal],
  );

  const content = useMemo(
    () => (
      <Suspense fallback={null}>
        {entityGroup && (
          <EntityGroupForm
            entityGroup={entityGroup}
            onSubmitCallback={updateEntityGroupHandler}
            submitPending={isPendingUpdate}
            submitError={errorUpdate}
          />
        )}
      </Suspense>
    ),
    [entityGroup, errorUpdate, isPendingUpdate, updateEntityGroupHandler],
  );

  return (
    <Modal
      trigger={trigger}
      open={!!editEntityGroupId}
      title={`Edit group ${editEntityGroupId}`}
      content={content}
      onOpenChange={closeModal}
      size="md"
    />
  );
};

export default EditEntityGroupModal;
