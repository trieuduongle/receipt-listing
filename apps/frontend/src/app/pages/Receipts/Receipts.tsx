import { FileOutlined } from '@ant-design/icons';
import { BreadcrumbProps, Divider, Skeleton } from 'antd';
import React, { useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { receiptsApiSlice } from '~/api-slices';
import { PageContent, PageHeader } from '~/components';
import { useInfiniteQuery } from '~/hooks';

const breadcrumb: BreadcrumbProps['routes'] = [
  {
    path: '/home',
    breadcrumbName: 'Home',
  },
  {
    path: '',
    breadcrumbName: 'Receipts',
  },
];

const StyledFileOutlined = styled(FileOutlined)`
  font-size: 20px;
  vertical-align: middle;
`;

export const Receipts = () => {
  // const navigate = useNavigate();
  // const [pagination, setPagination] = useState<PaginationQuery>({
  //   page: DEFAULT_PAGE,
  //   size: DEFAULT_PAGE_SIZE,
  // });
  // const { data: receipts, isLoading } = useGetReceiptsQuery({
  //   page: pagination.page,
  //   size: pagination.size,
  // });

  const result = useInfiniteQuery(receiptsApiSlice.endpoints.getReceipts, {
    defaultPage: 0,
    defaultSize: 3,
    getNextPageParam: (item) =>
      item && !item.last ? item.page + 1 : undefined,
    getActualCurrentPageSize: (item) => {
      return item?.content.length ?? 0;
    },
  });

  const loadMoreData = useCallback(() => {
    if (result.isLoading) {
      return;
    }

    result.fetchNextPage();
  }, [result]);

  return (
    <>
      <PageHeader title="Receipts" routes={breadcrumb}></PageHeader>

      <PageContent>
        {/* <Spin spinning={isLoading}>
          <List
            className="mobile-menu"
            dataSource={receipts?.content}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <MenuItem
                  title={item.title}
                  icon={<StyledFileOutlined />}
                  onClick={() => navigate(`/receipts/${item.id}`)}
                />
              </List.Item>
            )}
          ></List>
        </Spin> */}
        <>
          {/* {result.isLoading && <div>Loading...</div>}
          {result.isSuccess && (
            <>
              {result.data?.map((page, index) => (
                <React.Fragment key={index}>
                  {page.content.map((contact) => (
                    <div key={contact.id}>{contact.title}</div>
                  ))}
                </React.Fragment>
              ))}
              <div>
                <button
                  onClick={() => result.fetchNextPage()}
                  disabled={!result.hasNextPage || result.isFetching}
                >
                  {result.isFetching
                    ? 'Loading...'
                    : result.hasNextPage
                    ? 'Load more'
                    : 'Nothing more to load'}
                </button>
              </div>
            </>
          )}
          {result.isError && <div>Something went wrong.</div>} */}

          <div
            id="scrollableDiv"
            style={{
              height: 30,
              overflow: 'auto',
              padding: '0 16px',
              border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
          >
            <InfiniteScroll
              dataLength={result.total || 1}
              next={loadMoreData}
              hasMore={result.hasNextPage || !result.data}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              endMessage={<Divider plain>It is all, nothing more </Divider>}
              scrollableTarget="scrollableDiv"
            >
              {/* <List
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        /> */}
              {result.data?.map((page, index) => (
                <React.Fragment key={index}>
                  {page.content.map((contact) => (
                    <div key={contact.id}>{contact.title}</div>
                  ))}
                </React.Fragment>
              ))}
            </InfiniteScroll>
          </div>
        </>
      </PageContent>
    </>
  );
};
