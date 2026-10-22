import React from 'react';
import { useGetLocations } from '../../api/locations/useGetLocations';
import LocationTable from './LocationTable';
import { PbViewModule } from '../../generated/api-types/data-contracts';

interface LocationListSelectionProps {
  module: PbViewModule;
  onSelect: (locationId: number[]) => void;
}

const LocationListSelection: React.FC<LocationListSelectionProps> = ({ module }) => {
  const { data: locationsData = [] } = useGetLocations({ variables: module });

  return <LocationTable data={locationsData} module={module} isSelectionTable={true} />;
};

export default LocationListSelection;
