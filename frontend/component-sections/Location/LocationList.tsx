import React from 'react';
import { Button } from '../../components/Button/Button';
import { useModuleRoute } from '../../hooks/useModuleRoute';
import { useGetLocations } from '../../api/locations/useGetLocations';
import LocationTable from './LocationTable';
import { PbEntityType } from '../../generated/api-types/data-contracts';

interface LocationListProps {
  canEdit?: boolean;
}

const LocationList: React.FC<LocationListProps> = ({ canEdit }) => {
  const [module, moduleId] = useModuleRoute(PbEntityType.ENTITY_TYPE_LOCATION);

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
        canEdit={canEdit}
        module={module}
      />
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} loading={isFetchingNextPage}>
          Load more locations
        </Button>
      )}
    </div>
  );
};

export default LocationList;
