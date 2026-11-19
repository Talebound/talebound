import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PAGE_SIZE_LOCATIONS, useGetLocations } from '../../api/locations/useGetLocations';
import { DEFAULT_LOCATION_SORT, Tables } from '../../utils/types/tables';
import { PbEntityType, PbViewModule } from '../../generated/api-types/data-contracts';
import { useCanEditModuleEntities } from '../../hooks/useCanEditModuleEntities';
import LocationTable from './LocationTable';
import ErrorText from '../../components/ErrorText/ErrorText';
import { Button } from '../../components/Button/Button';

interface LocationListContentProps {
  module: PbViewModule;
  moduleId: number;
  canEdit?: boolean;
  isSelectionTable?: boolean;
  onSelect?: (ids: number[]) => void;
}

const LocationListContent: React.FC<LocationListContentProps> = ({
  module,
  moduleId,
  canEdit,
  isSelectionTable,
  onSelect,
}) => {
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<Tables>(DEFAULT_LOCATION_SORT);
  const { data, isFetching, hasNextPage, fetchNextPage, isFetchNextPageError, error } =
    useGetLocations({ variables: { moduleId, ...sorting }, enabled: !!moduleId });
  const ids = useMemo(() => data?.pages.flatMap((entry) => entry.locationIds) ?? [], [data]);
  const canCreatePost = useCanEditModuleEntities(moduleId, [
    PbEntityType.ENTITY_TYPE_LOCATION,
    PbEntityType.ENTITY_TYPE_POST,
  ]);
  const onPageChange = useCallback((next: number) => setPage(next), []);

  useEffect(() => {
    if (hasNextPage && !isFetchNextPageError && ids.length <= PAGE_SIZE_LOCATIONS * (page - 1)) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchNextPageError, ids.length, page, fetchNextPage]);

  return (
    <>
      <LocationTable
        module={module}
        locationIds={ids}
        totalCount={data?.pages[0]?.totalCount ?? 0}
        currentPage={page}
        sorting={sorting}
        setSorting={setSorting}
        onPageChange={onPageChange}
        loading={isFetching}
        canEdit={canEdit}
        canCreatePost={canCreatePost}
        isSelectionTable={isSelectionTable}
        onSelect={onSelect}
      />
      <ErrorText error={error} />
      {isFetchNextPageError && <Button onClick={() => fetchNextPage()}>Retry loading page</Button>}
    </>
  );
};

export default LocationListContent;
