import React, { useCallback } from 'react';
import { Button } from '../../../../../components/Button/Button';
import ErrorText from '../../../../../components/ErrorText/ErrorText';
import { TbPlus } from 'react-icons/tb';
import { useCreateMapPinTypeGroup } from '../../../../../api/maps/useCreateMapPinTypeGroup';

interface NewPinTypeGroupButtonProps {
  moduleId: number;
}

const NewPinTypeGroupButton: React.FC<NewPinTypeGroupButtonProps> = ({ moduleId }) => {
  const {
    mutate: createMapPinTypeGroup,
    isPending: isPendingCreate,
    error: errorCreate,
  } = useCreateMapPinTypeGroup();

  const newPinTypeHandler = useCallback(() => {
    createMapPinTypeGroup({
      moduleId,
      body: {
        name: 'New group',
      },
    });
  }, [createMapPinTypeGroup, moduleId]);

  return (
    <>
      <Button size="md" fullWidth loading={isPendingCreate} onClick={newPinTypeHandler}>
        <TbPlus />
        New pin type group
      </Button>
      <ErrorText error={errorCreate} />
    </>
  );
};

export default NewPinTypeGroupButton;
