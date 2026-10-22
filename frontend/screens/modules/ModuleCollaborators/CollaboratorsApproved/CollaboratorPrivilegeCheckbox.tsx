import React, { useCallback } from 'react';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import { PbEntityType, PbModuleAdmin } from '../../../../generated/api-types/data-contracts';
import { useUpdateModuleAdmin } from '../../../../api/modules/useUpdateModuleAdmin';
import ErrorText from '../../../../components/ErrorText/ErrorText';

interface CollaboratorPrivilegeCheckboxProps {
  entityType: PbEntityType;
  data: PbModuleAdmin;
  disabled: boolean;
}

const CollaboratorPrivilegeCheckbox: React.FC<CollaboratorPrivilegeCheckboxProps> = ({
  entityType,
  data,
  disabled,
}) => {
  const {
    mutate: updateModuleAdmin,
    isPending: isPendingUpdate,
    error: errorUpdate,
  } = useUpdateModuleAdmin();

  const isAllowed = (data.allowedEntityTypes?.findIndex((e) => e === entityType) ?? -1) >= 0;

  const handleCheckboxChange = useCallback(() => {
    const newAllowedEntityTypes = data.allowedEntityTypes;
    if (newAllowedEntityTypes) {
      const entityIndex = newAllowedEntityTypes.findIndex((e) => e === entityType);
      if (entityIndex >= 0) {
        newAllowedEntityTypes?.splice(entityIndex, 1);
      } else {
        newAllowedEntityTypes?.push(entityType);
      }

      if (data.moduleId && data.userId) {
        updateModuleAdmin({
          moduleId: data.moduleId,
          body: {
            userId: data.userId,
            allowedEntityTypes: {
              entityTypes: newAllowedEntityTypes,
            },
          },
        });
      }
    }
  }, [data.allowedEntityTypes, data.moduleId, data.userId, entityType, updateModuleAdmin]);

  return (
    <>
      <Checkbox
        checked={isAllowed}
        onCheckedChange={handleCheckboxChange}
        disabled={isPendingUpdate || disabled}
        error={!!errorUpdate}
      />
      <ErrorText error={errorUpdate} />
    </>
  );
};

export default CollaboratorPrivilegeCheckbox;
