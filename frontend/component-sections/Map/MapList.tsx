import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ReduxState } from '../../store';
import { useSelector } from 'react-redux';
import { EntityTableType, Tables } from '../../utils/types/tables';
import { PAGE_SIZE_MAPS, useGetMaps } from '../../api/maps/useGetMaps';
import { selectMapsByIds } from '../../adapters/MapAdapter';
import MapsTable from './MapsTable';

interface MapListProps {
  tableType?: EntityTableType;
  canEdit?: boolean;
  moduleId?: number;
}

const MapList: React.FC<MapListProps> = ({
  tableType = EntityTableType.LIST,
  canEdit,
  moduleId,
}) => {
  const [openedPage, setOpenedPage] = useState(1);
  const [sorting, setSorting] = useState<Tables>({
    orderBy: 'created_at',
    orderDirection: 'desc',
  });

  const {
    data: mapsDataPages,
    isFetching: isFetchingMaps,
    fetchNextPage,
    hasNextPage,
  } = useGetMaps({ variables: { moduleId, ...sorting } });

  const mapIds = useMemo(
    () => mapsDataPages?.pages?.map((page) => page.mapIds ?? []).flat() ?? [],
    [mapsDataPages],
  );

  const mapsData = useSelector((state: ReduxState) => selectMapsByIds(state, mapIds), [mapIds]);

  useEffect(() => {
    if (
      hasNextPage &&
      mapsData.length > 0 &&
      mapsData.length <= PAGE_SIZE_MAPS * (openedPage - 1)
    ) {
      console.log('Fetching page...', mapsData.length);
      fetchNextPage();
    }
  }, [hasNextPage, mapsData.length, openedPage, fetchNextPage]);

  const totalMapCount = useMemo(() => {
    return mapsDataPages?.pages[0]?.totalCount ?? 0;
  }, [mapsDataPages]);

  const onPageChange = useCallback((page: number) => {
    setOpenedPage(page);
  }, []);

  return (
    <MapsTable
      tableType={tableType}
      totalCount={totalMapCount}
      loading={isFetchingMaps}
      data={mapsData}
      canEdit={canEdit}
      onPageChange={onPageChange}
      setSorting={setSorting}
    />
  );
};

export default MapList;
