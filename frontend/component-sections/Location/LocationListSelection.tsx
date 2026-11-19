import React from 'react';
import { useGetModuleId } from '../../api/modules/useGetModuleId';
import { PbViewModule } from '../../generated/api-types/data-contracts';
import LocationListContent from './LocationListContent';

interface LocationListSelectionProps {
  module: PbViewModule;
  onSelect: (locationId: number[]) => void;
}

const LocationListSelection: React.FC<LocationListSelectionProps> = ({ module, onSelect }) => {
  const { data: moduleId = 0 } = useGetModuleId({ variables: module });
  return (
    <LocationListContent
      key={moduleId}
      module={module}
      moduleId={moduleId}
      isSelectionTable
      onSelect={onSelect}
    />
  );
};

export default LocationListSelection;
