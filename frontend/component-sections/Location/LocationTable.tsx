import React, { useCallback, useMemo, useState } from 'react';
import type { TableProps } from 'antd';
import {
  DEFAULT_LOCATION_SORT,
  Tables,
  ENTITY_TABLE_STYLE,
  TaleboundColumnType,
  columnSortOrder,
  tableSorter,
} from '../../utils/types/tables';
import { PAGE_SIZE_LOCATIONS } from '../../api/locations/useGetLocations';
import AvatarById from '../../components/AvatarById/AvatarById';
import { useAppSelector } from '../../store/hooks';
import { selectLocationsByIds } from '../../adapters/LocationAdapter';
import { Table } from 'antd';
import { Button } from '../../components/Button/Button';
import { MdDelete, MdEdit } from 'react-icons/md';
import LocationFormModal from './LocationFormModal';
import { PbLocation, PbViewModule } from '../../generated/api-types/data-contracts';
import { useDeleteBulkLocation } from '../../api/locations/useDeleteBulkLocation';
import ErrorText from '../../components/ErrorText/ErrorText';
import { Row } from '../../components/Flex/Flex';
import { useDeleteLocation } from '../../api/locations/useDeleteLocation';
import AlertDialog from '../../components/AlertDialog/AlertDialog';
import LocationTablePostCell from './LocationTablePostCell';

interface LocationTableProps {
  locationIds: number[];
  currentPage: number;
  totalCount: number;
  sorting: Tables;
  setSorting: React.Dispatch<React.SetStateAction<Tables>>;
  onPageChange: (page: number, pageSize: number) => void;
  loading?: boolean;
  canCreatePost?: boolean;
  onSelect?: (ids: number[]) => void;
  canEdit?: boolean;
  module: PbViewModule;
  isSelectionTable?: boolean;
  isSelectionMultiple?: boolean;
}

const LocationTable: React.FC<LocationTableProps> = ({
  locationIds,
  currentPage,
  totalCount,
  sorting,
  setSorting,
  onPageChange,
  loading,
  canCreatePost,
  onSelect,
  canEdit,
  module,
  isSelectionTable = false,
  isSelectionMultiple = false,
}) => {
  const data = useAppSelector((state) => selectLocationsByIds(state, locationIds));
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [updateLocation, setUpdateLocation] = useState<PbLocation>();

  canEdit = canEdit && !isSelectionTable;

  const {
    mutate: deleteBulkLocations,
    isPending: isPendingDeleteBulk,
    error: errorDeleteBulk,
  } = useDeleteBulkLocation();

  const {
    mutate: deleteLocation,
    isPending: isPendingDelete,
    error: errorDelete,
  } = useDeleteLocation();

  const handleCloseModal = useCallback(() => {
    setUpdateLocation(undefined);
  }, []);

  const onSelectChange = useCallback(
    (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
      onSelect?.(newSelectedRowKeys.map(Number));
    },
    [onSelect],
  );

  const rowSelection: TableProps<PbLocation>['rowSelection'] = useMemo(
    () =>
      canEdit || isSelectionTable
        ? {
            selectedRowKeys,
            columnWidth: 40,
            preserveSelectedRowKeys: true,
            onChange: onSelectChange,
            type: isSelectionTable ? (isSelectionMultiple ? 'checkbox' : 'radio') : 'checkbox',
          }
        : undefined,
    [canEdit, selectedRowKeys, onSelectChange, isSelectionTable, isSelectionMultiple],
  );

  const openEditModal = useCallback((record: PbLocation) => setUpdateLocation(record), []);

  const deleteLocationRecord = useCallback(
    (record: PbLocation) => {
      const { id: locationId } = record;
      if (locationId) {
        deleteLocation({ locationId });
      }
    },
    [deleteLocation],
  );

  const actionButtons = useCallback(
    (record: PbLocation) => {
      const updateHandler = () => openEditModal(record);
      const deleteHandler = () => deleteLocationRecord(record);

      return (
        <Row gap="xs">
          <Button icon onClick={updateHandler} size="md" color="primaryOutline">
            <MdEdit />
          </Button>
          <AlertDialog
            dialogSize="md"
            triggerElement={
              <Button icon size="md" color="dangerOutline">
                <MdDelete />
              </Button>
            }
            title={`Delete location "${record.name}"`}
            description="All assigned menu entities and map pins will be deleted."
            submitAction={deleteHandler}
          />
        </Row>
      );
    },
    [openEditModal, deleteLocationRecord],
  );

  const columns: TaleboundColumnType<PbLocation>[] = useMemo(() => {
    const cols: TaleboundColumnType<PbLocation>[] = [
      {
        title: '',
        key: 'thumbnailImageId',
        dataIndex: 'thumbnailImageId',
        render: (value: number | undefined) => <AvatarById size="md" imageId={value} />,
        width: 48,
      },
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
        render: (value: string) => <b title={value}>{value}</b>,
        ellipsis: true,
        sorter: true,
        sort_field: 'name',
        sortOrder: columnSortOrder(sorting, 'name'),
        width: '200px',
      },
      {
        title: 'Description',
        key: 'description',
        ellipsis: true,
        dataIndex: 'description',
        sorter: true,
        sort_field: 'description',
        sortOrder: columnSortOrder(sorting, 'description'),
      },
      {
        title: 'Post',
        key: 'postId',
        dataIndex: 'postId',
        render: (_, record) =>
          record.id && (
            <LocationTablePostCell
              locationId={record.id}
              postId={record.postId}
              canEdit={canEdit && canCreatePost}
            />
          ),
        width: 180,
      },
    ];

    if (canEdit) {
      cols.push({
        title: '',
        key: 'action-buttons',
        width: 88,
        render: (_, record) => actionButtons(record),
      });
    }

    return cols;
  }, [canEdit, canCreatePost, actionButtons, sorting]);

  const summary: TableProps<PbLocation>['summary'] = useCallback(() => {
    if (!canEdit) return undefined;
    if (selectedRowKeys.length === 0) return undefined;

    const deleteBulkHandler = () => {
      const locationIds = selectedRowKeys.map((key) => parseInt(key.toString()));
      deleteBulkLocations(
        { locationIds },
        {
          onSuccess: () => {
            setSelectedRowKeys([]);
          },
        },
      );
    };

    return (
      <Table.Summary fixed>
        <Table.Summary.Row>
          <Table.Summary.Cell colSpan={columns.length + (rowSelection ? 1 : 0)} index={0}>
            <AlertDialog
              dialogSize="md"
              triggerElement={
                <Button color="dangerFill" loading={isPendingDeleteBulk}>
                  <MdDelete />
                  Delete locations ({selectedRowKeys.length})
                </Button>
              }
              title={`Delete ${selectedRowKeys.length} location${
                selectedRowKeys.length > 1 ? 's' : ''
              }`}
              description="All assigned menu entities and map pins to these locations will be deleted."
              submitAction={deleteBulkHandler}
            />

            <ErrorText error={errorDeleteBulk} />
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    );
  }, [
    canEdit,
    columns.length,
    rowSelection,
    deleteBulkLocations,
    errorDeleteBulk,
    isPendingDeleteBulk,
    selectedRowKeys,
  ]);

  const onRow: TableProps<PbLocation>['onRow'] = useCallback(
    (record: PbLocation) => {
      if (!isSelectionTable) return {};

      return {
        onClick: (event) => {
          if (
            (event.target as HTMLElement).closest(
              'button, a, input, .ant-checkbox-wrapper, .ant-radio-wrapper',
            )
          )
            return;
          const id = record.id!;
          onSelectChange(
            isSelectionMultiple
              ? selectedRowKeys.includes(id)
                ? selectedRowKeys.filter((key) => key !== id)
                : [...selectedRowKeys, id]
              : [id],
          );
        },
      };
    },
    [isSelectionTable, isSelectionMultiple, selectedRowKeys, onSelectChange],
  );

  return (
    <>
      <Table<PbLocation>
        loading={isPendingDelete || loading}
        tableLayout="fixed"
        style={ENTITY_TABLE_STYLE}
        scroll={{ x: 800 }}
        pagination={{
          current: currentPage,
          pageSize: PAGE_SIZE_LOCATIONS,
          total: totalCount,
          showSizeChanger: false,
          disabled: loading,
        }}
        onChange={tableSorter<PbLocation>(setSorting, DEFAULT_LOCATION_SORT, onPageChange)}
        rowSelection={rowSelection}
        showSorterTooltip={false}
        columns={columns}
        dataSource={data}
        rowKey="id"
        size="small"
        summary={summary}
        onRow={onRow}
      />
      <ErrorText error={errorDelete} />
      <LocationFormModal
        module={module}
        trigger={undefined}
        location={updateLocation}
        open={!!updateLocation}
        setOpen={handleCloseModal}
      />
    </>
  );
};

export default LocationTable;
