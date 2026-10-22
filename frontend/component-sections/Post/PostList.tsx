import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PAGE_SIZE_POSTS, useGetPosts } from '../../api/posts/useGetPosts';
import PostsTable from './PostsTable';
import { selectPostsByIds } from '../../adapters/PostAdapter';
import { ReduxState } from '../../store';
import { useSelector } from 'react-redux';
import { EntityTableType, Tables } from '../../utils/types/tables';

interface PostListProps {
  tableType?: EntityTableType;
  canEdit?: boolean;
  moduleId?: number;
}

const PostList: React.FC<PostListProps> = ({
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
    data: postsDataPages,
    isFetching: isFetchingPosts,
    fetchNextPage,
    hasNextPage,
  } = useGetPosts({ variables: { moduleId, ...sorting } });

  const postIds = useMemo(
    () => postsDataPages?.pages?.map((page) => page.postIds ?? []).flat() ?? [],
    [postsDataPages],
  );

  const postsData = useSelector((state: ReduxState) => selectPostsByIds(state, postIds), [postIds]);

  useEffect(() => {
    if (
      hasNextPage &&
      postsData.length > 0 &&
      postsData.length <= PAGE_SIZE_POSTS * (openedPage - 1)
    ) {
      console.log('Fetching page...', postsData.length);
      fetchNextPage();
    }
  }, [hasNextPage, postsData.length, openedPage, fetchNextPage]);

  const totalPostCount = useMemo(() => {
    return postsDataPages?.pages[0]?.totalCount ?? 0;
  }, [postsDataPages]);

  const onPageChange = useCallback((page: number) => {
    setOpenedPage(page);
  }, []);

  return (
    <PostsTable
      tableType={tableType}
      totalCount={totalPostCount}
      loading={isFetchingPosts}
      data={postsData}
      canEdit={canEdit}
      onPageChange={onPageChange}
      setSorting={setSorting}
    />
  );
};

export default PostList;
