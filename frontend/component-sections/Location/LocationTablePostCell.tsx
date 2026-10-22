import React, { useCallback, useMemo, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useCreateLocationPost } from '../../api/locations/useCreateLocationPost';
import AssignPostModal from '../Post/AssignPostModal/AssignPostModal';
import { Button } from '../../components/Button/Button';
import ErrorText from '../../components/ErrorText/ErrorText';

interface LocationTablePostCellProps {
  locationId: number;
  postId?: number;
  postTitle?: string;
  canEdit?: boolean;
}

const LocationTablePostCell: React.FC<LocationTablePostCellProps> = ({
  locationId,
  postId,
  postTitle,
  canEdit,
}) => {
  const [assignPostModal, setAssignPostModal] = useState(false);

  const {
    mutate: createLocationPost,
    isPending: isPendingCreateLocationPost,
    error: errorCreateLocationPost,
  } = useCreateLocationPost();

  const createNewPostCallback = useCallback(() => {
    createLocationPost({
      locationId,
    });
  }, [createLocationPost, locationId]);

  const trigger = useMemo(
    () => (
      <Button
        size="sm"
        color="primaryOutline"
        loading={isPendingCreateLocationPost}
        disabled={isPendingCreateLocationPost}
      >
        <MdAdd size={10} /> Assign Post
      </Button>
    ),
    [isPendingCreateLocationPost],
  );

  if (!postId) {
    return (
      <>
        {canEdit && (
          <AssignPostModal
            trigger={trigger}
            open={assignPostModal}
            setOpen={setAssignPostModal}
            createNewPostCallback={createNewPostCallback}
            chooseExistingPostCallback={() => {}}
          />
        )}
        <ErrorText error={errorCreateLocationPost} />
      </>
    );
  }
  return <div>{postTitle}</div>;
};

export default LocationTablePostCell;
