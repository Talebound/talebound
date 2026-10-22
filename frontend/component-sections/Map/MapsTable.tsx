import React, { Suspense, useCallback, useMemo, useState } from 'react';
import { Table } from 'antd';
import { TablePaginationConfig, TableProps } from 'antd/lib';
import { Button } from '../../components/Button/Button';
import { MdEdit, MdOpenInNew } from 'react-icons/md';
import { Col, Row } from '../../components/Flex/Flex';
import AvatarById from '../../components/AvatarById/AvatarById';
import EntityTableDragHandle from '../../screens/menus/MenuCategory/EntityComponent/EntityTableDragHandle';
import {
  EntityTableType,
  Tables,
  tableSorter,
  TaleboundColumnType,
} from '../../utils/types/tables';
import { PAGE_SIZE_MAPS } from '../../api/maps/useGetMaps';
import MapFormModal from './MapFormModal';
import MapDetailModal from './MapDetailModal';
import { PbEntityType, PbMap } from '../../generated/api-types/data-contracts';
import { formatDate } from '../../utils/functions/formatDate';

interface MapsTableProps {
  tableType?: EntityTableType;
  data: (PbMap | undefined)[];
  totalCount: number;
  canEdit?: boolean;
  loading?: boolean;
  isSelectionTable?: boolean;
  isSelectionMultiple?: boolean;
  onPageChange: (page: number, pageSize: number) => void;
  setSorting: React.Dispatch<React.SetStateAction<Tables>>;
}

const MapsTable: React.FC<MapsTableProps> = ({
  tableType = EntityTableType.LIST,
  data,
  totalCount,
  canEdit,
  loading,
  isSelectionTable = false,
  isSelectionMultiple = false,
  onPageChange,
  setSorting,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [updateMap, setUpdateMap] = useState<PbMap>();
  const [detailModalMapId, setDetailModalMapId] = useState<number>();

  canEdit = canEdit && !isSelectionTable;

  const handleCloseUpdateMapModal = useCallback(() => setUpdateMap(undefined), []);
  const handleCloseMapDetailModal = useCallback(() => setDetailModalMapId(undefined), []);

  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  const rowSelection: TableProps<PbMap>['rowSelection'] = useMemo(
    () =>
      (canEdit || isSelectionTable) && tableType === EntityTableType.LIST
        ? {
            selectedRowKeys,
            onChange: onSelectChange,
            type: isSelectionTable ? (isSelectionMultiple ? 'checkbox' : 'radio') : 'checkbox',
          }
        : undefined,
    [tableType, canEdit, selectedRowKeys, onSelectChange, isSelectionTable, isSelectionMultiple],
  );

  const openEditModal = useCallback((record: PbMap) => setUpdateMap(record), []);

  const actionButtons = useCallback(
    (record: PbMap) => {
      const updateHandler = () => openEditModal(record);

      return (
        <Row gap="xs">
          <Button icon onClick={updateHandler} size="md" color="primaryOutline">
            <MdEdit />
          </Button>
        </Row>
      );
    },
    [openEditModal],
  );

  const openMapModalButtons = useCallback((record: PbMap) => {
    const openHandler = () => setDetailModalMapId(record.id!);

    return (
      <Button icon onClick={openHandler} size="md" color="primaryOutline">
        <MdOpenInNew />
      </Button>
    );
  }, []);

  const columns: TaleboundColumnType<PbMap>[] = useMemo(() => {
    const cols: TaleboundColumnType<PbMap>[] = [
      {
        title: '',
        key: 'thumbnailImageId',
        dataIndex: 'thumbnailImageId',
        render: (value: number) => (
          <Suspense fallback={null}>
            <AvatarById size="md" imageId={value} />
          </Suspense>
        ),
        width: '40px',
      },
      {
        title: 'Title',
        key: 'title',
        dataIndex: 'title',
        render: (value: string) => <b>{value}</b>,
        sorter: true,
        sort_field: 'title',
      },
      {
        title: 'Created at',
        key: 'createdAt',
        dataIndex: 'createdAt',
        width: 140,
        render: (value: string) => formatDate(value, false, 'week'),
        defaultSortOrder: 'descend',
        sorter: true,
        sort_field: 'created_at',
      },
      {
        title: 'Last updated at',
        key: 'lastUpdatedAt',
        dataIndex: 'lastUpdatedAt',
        width: 140,
        render: (value: string) => formatDate(value, false, 'week'),
        sorter: true,
        sort_field: 'last_updated_at',
      },
      {
        title: 'W',
        key: 'width',
        dataIndex: 'width',
        width: 50,
        render: (value) => value,
        sorter: true,
        sort_field: 'width',
      },
      {
        title: 'H',
        key: 'height',
        dataIndex: 'height',
        width: 50,
        render: (value) => value,
        sorter: true,
        sort_field: 'height',
      },
    ];

    if (canEdit) {
      cols.push({
        title: '',
        key: 'action-buttons',
        render: (_, record) => actionButtons(record),
        width: '40px',
      });
    }

    cols.push({
      title: '',
      key: 'action-buttons',
      render: (_, record) => openMapModalButtons(record),
      width: '40px',
    });

    if (tableType === EntityTableType.DRAG) {
      cols.push({
        title: '',
        key: 'drag-handle',
        render: (_, record) =>
          record.id ? (
            <EntityTableDragHandle
              entityType={PbEntityType.ENTITY_TYPE_MAP}
              entityId={record.id}
              imageId={record.thumbnailImageId}
            />
          ) : null,
        width: '40px',
      });
    }

    return cols;
  }, [tableType, canEdit, actionButtons, openMapModalButtons]);

  const onRow: TableProps<PbMap>['onRow'] = useCallback(
    (record: PbMap) => {
      if (!isSelectionTable) return {};

      return {
        onClick: () => {
          setSelectedRowKeys([record.id!]);
        },
      };
    },
    [isSelectionTable],
  );

  const paginationConfig: TablePaginationConfig | undefined = useMemo(() => {
    return {
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} maps`, // TODO: i18n
      showSizeChanger: false,
      total: totalCount,
      pageSize: PAGE_SIZE_MAPS,
      size: 'default',
      onChange: onPageChange,
      disabled: loading,
    };
  }, [totalCount, onPageChange, loading]);

  const filteredData = useMemo(() => data.filter((d) => d !== undefined) as PbMap[], [data]);

  const onChangeHandler = useMemo(() => tableSorter<PbMap>(setSorting), [setSorting]);

  return (
    <>
      <Col fullWidth>
        <Table<PbMap>
          loading={loading}
          rowSelection={rowSelection}
          pagination={paginationConfig}
          showSorterTooltip={false}
          columns={columns}
          dataSource={filteredData}
          onChange={onChangeHandler}
          rowKey="id"
          size="small"
          onRow={onRow}
        />
      </Col>
      {/*<ErrorText error={errorDelete} />*/}
      <MapFormModal
        trigger={undefined}
        map={updateMap}
        open={!!updateMap}
        setOpen={handleCloseUpdateMapModal}
      />
      <MapDetailModal
        mapId={detailModalMapId}
        canEdit={canEdit}
        trigger={undefined}
        open={!!detailModalMapId}
        setOpen={handleCloseMapDetailModal}
      />
    </>
  );
};

export default MapsTable;
