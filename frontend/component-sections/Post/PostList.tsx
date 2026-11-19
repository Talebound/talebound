import ErrorText from '../../components/ErrorText/ErrorText';
import { Button } from '../../components/Button/Button';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PAGE_SIZE_POSTS, useGetPosts } from '../../api/posts/useGetPosts';
import PostsTable from './PostsTable';
import { selectPostsByIds } from '../../adapters/PostAdapter';
import { ReduxState } from '../../store';
import { useAppSelector } from '../../store/hooks';
import { DEFAULT_ENTITY_SORT, EntityTableType, Tables } from '../../utils/types/tables';

interface PostListProps {
  tableType?: EntityTableType;
  canEdit?: boolean;
  moduleId?: number;
}

const PostListContent: React.FC<PostListProps> = ({
  tableType = EntityTableType.LIST,
  canEdit,
  moduleId,
}) => {
  const [openedPage, setOpenedPage] = useState(1);
  const [sorting, setSorting] = useState<Tables>(DEFAULT_ENTITY_SORT);

  const {
    data: postsDataPages,
    isFetching: isFetchingPosts,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    error,
  } = useGetPosts({ variables: { moduleId, ...sorting } });

  const postIds = useMemo(
    () => postsDataPages?.pages?.map((page) => page.postIds ?? []).flat() ?? [],
    [postsDataPages],
  );

  const postsData = useAppSelector((state: ReduxState) => selectPostsByIds(state, postIds));

  useEffect(() => {
    if (
      hasNextPage &&
      !isFetchNextPageError &&
      postsData.length > 0 &&
      postsData.length <= PAGE_SIZE_POSTS * (openedPage - 1)
    ) {
      console.log('Fetching page...', postsData.length);
      fetchNextPage();
    }
  }, [hasNextPage, isFetchNextPageError, postsData.length, openedPage, fetchNextPage]);

  const totalPostCount = useMemo(() => {
    return postsDataPages?.pages[0]?.totalCount ?? 0;
  }, [postsDataPages]);

  const onPageChange = useCallback((page: number) => {
    setOpenedPage(page);
  }, []);

  return (
    <>
      <PostsTable
        tableType={tableType}
        totalCount={totalPostCount}
        loading={isFetchingPosts}
        data={postsData}
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

const PostList: React.FC<PostListProps> = (props) => (
  <PostListContent key={props.moduleId} {...props} />
);

export default PostList;
