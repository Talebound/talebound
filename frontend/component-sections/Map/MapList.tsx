import ErrorText from '../../components/ErrorText/ErrorText';
import { Button } from '../../components/Button/Button';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ReduxState } from '../../store';
import { useAppSelector } from '../../store/hooks';
import { DEFAULT_ENTITY_SORT, EntityTableType, Tables } from '../../utils/types/tables';
import { PAGE_SIZE_MAPS, useGetMaps } from '../../api/maps/useGetMaps';
import { selectMapsByIds } from '../../adapters/MapAdapter';
import MapsTable from './MapsTable';

interface MapListProps {
  tableType?: EntityTableType;
  canEdit?: boolean;
  moduleId?: number;
}

const MapListContent: React.FC<MapListProps> = ({
  tableType = EntityTableType.LIST,
  canEdit,
  moduleId,
}) => {
  const [openedPage, setOpenedPage] = useState(1);
  const [sorting, setSorting] = useState<Tables>(DEFAULT_ENTITY_SORT);

  const {
    data: mapsDataPages,
    isFetching: isFetchingMaps,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    error,
  } = useGetMaps({ variables: { moduleId, ...sorting } });

  const mapIds = useMemo(
    () => mapsDataPages?.pages?.map((page) => page.mapIds ?? []).flat() ?? [],
    [mapsDataPages],
  );

  const mapsData = useAppSelector((state: ReduxState) => selectMapsByIds(state, mapIds));

  useEffect(() => {
    if (
      hasNextPage &&
      !isFetchNextPageError &&
      mapsData.length > 0 &&
      mapsData.length <= PAGE_SIZE_MAPS * (openedPage - 1)
    ) {
      console.log('Fetching page...', mapsData.length);
      fetchNextPage();
    }
  }, [hasNextPage, isFetchNextPageError, mapsData.length, openedPage, fetchNextPage]);

  const totalMapCount = useMemo(() => {
    return mapsDataPages?.pages[0]?.totalCount ?? 0;
  }, [mapsDataPages]);

  const onPageChange = useCallback((page: number) => {
    setOpenedPage(page);
  }, []);

  return (
    <>
      <MapsTable
        tableType={tableType}
        totalCount={totalMapCount}
        loading={isFetchingMaps}
        data={mapsData}
        canEdit={canEdit}
        onPageChange={onPageChange}
        setSorting={setSorting}
        sorting={sorting}
        currentPage={openedPage}
      />
      <ErrorText error={error} />
      {isFetchNextPageError && <Button onClick={() => fetchNextPage()}>Retry loading page</Button>}
    </>
  );
};

const MapList: React.FC<MapListProps> = (props) => (
  <MapListContent key={props.moduleId} {...props} />
);

export default MapList;
