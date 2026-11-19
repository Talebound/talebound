import React, { Suspense, useCallback, useMemo, useState } from 'react';
import { Table, type TablePaginationConfig, type TableProps } from 'antd';
import { Button } from '../../components/Button/Button';
import { MdEdit, MdOpenInNew } from 'react-icons/md';
import { PbEntityType, PbPost } from '../../generated/api-types/data-contracts';
import { Col, Row } from '../../components/Flex/Flex';
import PostFormModal from './PostFormModal';
import { PAGE_SIZE_POSTS } from '../../api/posts/useGetPosts';
import { formatDate } from '../../utils/functions/formatDate';
import PostDetailModal from './PostDetailModal';
import AvatarById from '../../components/AvatarById/AvatarById';
import EntityTableDragHandle from '../../screens/menus/MenuCategory/EntityComponent/EntityTableDragHandle';
import {
  EntityTableType,
  Tables,
  ENTITY_TABLE_STYLE,
  tableSorter,
  columnSortOrder,
  DEFAULT_ENTITY_SORT,
  TaleboundColumnType,
} from '../../utils/types/tables';

interface PostsTableProps {
  tableType?: EntityTableType;
  data: (PbPost | undefined)[];
  totalCount: number;
  currentPage: number;
  sorting: Tables;
  canEdit?: boolean;
  loading?: boolean;
  isSelectionTable?: boolean;
  isSelectionMultiple?: boolean;
  onPageChange: (page: number, pageSize: number) => void;
  setSorting: React.Dispatch<React.SetStateAction<Tables>>;
}

const PostsTable: React.FC<PostsTableProps> = ({
  tableType = EntityTableType.LIST,
  data,
  totalCount,
  currentPage,
  sorting,
  canEdit,
  loading,
  isSelectionTable = false,
  isSelectionMultiple = false,
  onPageChange,
  setSorting,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [updatePost, setUpdatePost] = useState<PbPost>();
  const [detailModalPostId, setDetailModalPostId] = useState<number>();

  canEdit = canEdit && !isSelectionTable;

  const handleCloseUpdatePostModal = useCallback(() => setUpdatePost(undefined), []);
  const handleClosePostDetailModal = useCallback(() => setDetailModalPostId(undefined), []);

  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  const rowSelection: TableProps<PbPost>['rowSelection'] = useMemo(
    () =>
      (canEdit || isSelectionTable) && tableType === EntityTableType.LIST
        ? {
            selectedRowKeys,
            columnWidth: 40,
            preserveSelectedRowKeys: true,
            onChange: onSelectChange,
            type: isSelectionTable ? (isSelectionMultiple ? 'checkbox' : 'radio') : 'checkbox',
          }
        : undefined,
    [tableType, canEdit, selectedRowKeys, onSelectChange, isSelectionTable, isSelectionMultiple],
  );

  const openEditModal = useCallback((record: PbPost) => setUpdatePost(record), []);

  const actionButtons = useCallback(
    (record: PbPost) => {
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

  const openPostModalButtons = useCallback((record: PbPost) => {
    const openHandler = () => setDetailModalPostId(record.id!);

    return (
      <Button icon onClick={openHandler} size="md" color="primaryOutline">
        <MdOpenInNew />
      </Button>
    );
  }, []);

  const columns: TaleboundColumnType<PbPost>[] = useMemo(() => {
    const cols: TaleboundColumnType<PbPost>[] = [
      {
        title: '',
        key: 'imageThumbnailId',
        dataIndex: 'imageThumbnailId',
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
        render: (value: string) => <b title={value}>{value}</b>,
        ellipsis: true,
        sorter: true,
        sort_field: 'title',
        sortOrder: columnSortOrder(sorting, 'title'),
      },
      {
        title: 'Created at',
        key: 'createdAt',
        dataIndex: 'createdAt',
        width: 140,
        render: (value: string) => formatDate(value, false, 'week'),
        sorter: true,
        sort_field: 'created_at',
        sortOrder: columnSortOrder(sorting, 'created_at'),
      },
      {
        title: 'Last updated at',
        key: 'lastUpdatedAt',
        dataIndex: 'lastUpdatedAt',
        width: 140,
        render: (value: string) => formatDate(value, false, 'week'),
        sorter: true,
        sort_field: 'last_updated_at',
        sortOrder: columnSortOrder(sorting, 'last_updated_at'),
      },
    ];

    if (canEdit) {
      cols.push({
        title: '',
        key: 'edit-action',
        render: (_, record) => actionButtons(record),
        width: '40px',
      });
    }

    cols.push({
      title: '',
      key: 'open-action',
      render: (_, record) => openPostModalButtons(record),
      width: '40px',
    });

    if (tableType === EntityTableType.DRAG) {
      cols.push({
        title: '',
        key: 'drag-handle',
        render: (_, record) =>
          record.id ? (
            <EntityTableDragHandle
              entityType={PbEntityType.ENTITY_TYPE_POST}
              entityId={record.id}
              imageId={record.imageThumbnailId}
            />
          ) : null,
        width: '40px',
      });
    }

    return cols;
  }, [tableType, canEdit, actionButtons, openPostModalButtons, sorting]);

  const onRow: TableProps<PbPost>['onRow'] = useCallback(
    (record: PbPost) => {
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
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} posts`, // TODO: i18n
      showSizeChanger: false,
      total: totalCount,
      pageSize: PAGE_SIZE_POSTS,
      size: 'medium',
      current: currentPage,
      disabled: loading,
    };
  }, [totalCount, currentPage, loading]);

  const filteredData = useMemo(() => data.filter((d) => d !== undefined) as PbPost[], [data]);

  const onChangeHandler = useMemo(
    () => tableSorter<PbPost>(setSorting, DEFAULT_ENTITY_SORT, onPageChange),
    [setSorting, onPageChange],
  );

  return (
    <>
      <Col fullWidth>
        <Table<PbPost>
          tableLayout="fixed"
          style={ENTITY_TABLE_STYLE}
          scroll={{ x: 700 }}
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
      <PostFormModal
        trigger={undefined}
        post={updatePost}
        open={!!updatePost}
        setOpen={handleCloseUpdatePostModal}
      />
      <PostDetailModal
        postId={detailModalPostId}
        canEdit={canEdit}
        trigger={undefined}
        open={!!detailModalPostId}
        setOpen={handleClosePostDetailModal}
      />
    </>
  );
};

export default PostsTable;
