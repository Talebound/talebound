import React, { useCallback } from 'react';
import { useCreateMapPinType } from '../../../../../api/maps/useCreateMapPinType';
import { Button } from '../../../../../components/Button/Button';
import ErrorText from '../../../../../components/ErrorText/ErrorText';
import { PbPinShape } from '../../../../../generated/api-types/data-contracts';
import { TbPlus } from 'react-icons/tb';

interface NewPinTypeButtonProps {
  moduleId: number;
  mapPinTypeGroupId: number;
}

const NewPinTypeButton: React.FC<NewPinTypeButtonProps> = ({ moduleId, mapPinTypeGroupId }) => {
  const {
    mutate: createMapPinType,
    isPending: isPendingCreate,
    error: errorCreate,
  } = useCreateMapPinType();

  const newPinTypeHandler = useCallback(() => {
    createMapPinType({
      moduleId,
      body: {
        mapPinTypeGroupId,
        shape: PbPinShape.PIN,
        backgroundColor: 'white',
        borderColor: 'black',
        width: 30,
      },
    });
  }, [createMapPinType, mapPinTypeGroupId, moduleId]);

  return (
    <>
      <Button size="sm" loading={isPendingCreate} onClick={newPinTypeHandler}>
        <TbPlus />
        New pin type
      </Button>
      <ErrorText error={errorCreate} />
    </>
  );
};

export default NewPinTypeButton;
