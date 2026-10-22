import React, { useCallback, useMemo, useState } from 'react';
import { ColumnType } from 'antd/es/table';
import Avatar from '../../components/Avatar/Avatar';
import { Table } from 'antd';
import { TableProps } from 'antd/lib';
import { Button } from '../../components/Button/Button';
import { MdDelete, MdEdit } from 'react-icons/md';
import LocationFormModal from './LocationFormModal';
import { PbViewLocation, PbViewModule } from '../../generated/api-types/data-contracts';
import { useDeleteBulkLocation } from '../../api/locations/useDeleteBulkLocation';
import ErrorText from '../../components/ErrorText/ErrorText';
import { Row } from '../../components/Flex/Flex';
import { useDeleteLocation } from '../../api/locations/useDeleteLocation';
import AlertDialog from '../../components/AlertDialog/AlertDialog';
import LocationTablePostCell from './LocationTablePostCell';

interface LocationTableProps {
  data: PbViewLocation[];
  canEdit?: boolean;
  module: PbViewModule;
  isSelectionTable?: boolean;
  isSelectionMultiple?: boolean;
}

const LocationTable: React.FC<LocationTableProps> = ({
  data,
  canEdit,
  module,
  isSelectionTable = false,
  isSelectionMultiple = false,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [updateLocation, setUpdateLocation] = useState<PbViewLocation>();

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

  const rowSelection: TableProps<PbViewLocation>['rowSelection'] = useMemo(
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

  const openEditModal = useCallback((record: PbViewLocation) => setUpdateLocation(record), []);

  const deleteLocationRecord = useCallback(
    (record: PbViewLocation) => {
      const { id: locationId } = record;
      if (locationId) {
        deleteLocation({ locationId });
      }
    },
    [deleteLocation],
  );

  const actionButtons = useCallback(
    (record: PbViewLocation) => {
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

  const columns: ColumnType<PbViewLocation>[] = useMemo(() => {
    const cols: ColumnType<PbViewLocation>[] = [
      {
        title: '',
        key: 'thumbnailImageUrl',
        dataIndex: 'thumbnailImageUrl',
        render: (value: string) => <Avatar size="lg" url={value} />,
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
        key: 'postTitle',
        dataIndex: 'postTitle',
        render: (_, record) =>
          record.id && (
            <LocationTablePostCell
              locationId={record.id}
              postId={record.postId}
              postTitle={record.postTitle}
              canEdit={canEdit}
            />
          ),
        sorter: (a, b) => (a.postTitle ?? '').localeCompare(b.postTitle ?? ''),
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

  const summary: TableProps<PbViewLocation>['summary'] = useCallback(() => {
    if (!canEdit) return undefined;
    if (selectedRowKeys.length === 0) return undefined;

    const deleteBulkHandler = () => {
      const locationIds = selectedRowKeys.map((key) => parseInt(key.toString()));
      deleteBulkLocations(
        { locationIds, module },
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
  }, [canEdit, deleteBulkLocations, errorDeleteBulk, isPendingDeleteBulk, module, selectedRowKeys]);

  const onRow: TableProps<PbViewLocation>['onRow'] = useCallback(
    (record: PbViewLocation) => {
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
      <Table<PbViewLocation>
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
