import React from 'react';
import { Button } from '../../components/Button/Button';
import { useGetModuleId } from '../../api/modules/useGetModuleId';
import { useGetLocations } from '../../api/locations/useGetLocations';
import LocationTable from './LocationTable';
import { PbViewModule } from '../../generated/api-types/data-contracts';

interface LocationListSelectionProps {
  module: PbViewModule;
  onSelect: (locationId: number[]) => void;
}

const LocationListSelection: React.FC<LocationListSelectionProps> = ({ module }) => {
  const { data: moduleId } = useGetModuleId({ variables: module });
  const {
    data: locationsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetLocations({ variables: { moduleId }, enabled: !!moduleId });

  return (
    <div>
      <LocationTable
        locationIds={locationsData?.pages.flatMap((page) => page.locationIds) ?? []}
        module={module}
        isSelectionTable={true}
      />
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} loading={isFetchingNextPage}>
          Load more locations
        </Button>
      )}
    </div>
  );
};

export default LocationListSelection;
