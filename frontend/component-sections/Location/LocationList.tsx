import React from 'react';
import { useModuleRoute } from '../../hooks/useModuleRoute';
import { PbEntityType } from '../../generated/api-types/data-contracts';
import LocationListContent from './LocationListContent';

const LocationList: React.FC<{ canEdit?: boolean }> = ({ canEdit }) => {
  const [module, moduleId] = useModuleRoute(PbEntityType.ENTITY_TYPE_LOCATION);
  return (
    <LocationListContent key={moduleId} module={module} moduleId={moduleId} canEdit={canEdit} />
  );
};

export default LocationList;
