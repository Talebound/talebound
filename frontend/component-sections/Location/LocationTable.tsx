import React, { useCallback, useMemo, useState } from 'react';
import type { TableColumnType as ColumnType, TableProps } from 'antd';
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
  canEdit?: boolean;
  module: PbViewModule;
  isSelectionTable?: boolean;
  isSelectionMultiple?: boolean;
}

const LocationTable: React.FC<LocationTableProps> = ({
  locationIds,
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

  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  const rowSelection: TableProps<PbLocation>['rowSelection'] = useMemo(
    () =>
      canEdit || isSelectionTable
        ? {
            selectedRowKeys,
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

  const columns: ColumnType<PbLocation>[] = useMemo(() => {
    const cols: ColumnType<PbLocation>[] = [
      {
        title: '',
        key: 'thumbnailImageId',
        dataIndex: 'thumbnailImageId',
        render: (value: number | undefined) => <AvatarById size="lg" imageId={value} />,
      },
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
        render: (value: string) => <b>{value}</b>,
        sorter: (a, b) => (a.name ?? '').localeCompare(b.name ?? ''),
        width: '200px',
      },
      {
        title: 'Description',
        key: 'description',
        dataIndex: 'description',
        sorter: (a, b) => (a.description ?? '').localeCompare(b.description ?? ''),
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
              canEdit={canEdit}
            />
          ),
        width: '150px',
      },
    ];

    if (canEdit) {
      cols.push({
        title: '',
        key: 'action-buttons',
        render: (_, record) => actionButtons(record),
      });
    }

    return cols;
  }, [canEdit, actionButtons]);

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
          <Table.Summary.Cell colSpan={4} index={0}>
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
  }, [canEdit, deleteBulkLocations, errorDeleteBulk, isPendingDeleteBulk, selectedRowKeys]);

  const onRow: TableProps<PbLocation>['onRow'] = useCallback(
    (record: PbLocation) => {
      if (!isSelectionTable) return {};

      return {
        onClick: () => {
          setSelectedRowKeys([record.id!]);
        },
      };
    },
    [isSelectionTable],
  );

  return (
    <>
      <Table<PbLocation>
        loading={isPendingDelete}
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
