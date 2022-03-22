import { BreadcrumbProps, ConfigProvider, Divider, List } from 'antd';
import { useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { receiptsApiSlice } from '~/api-slices';
import { PageContent, PageHeader } from '~/components';
import { ListReceiptsSkeleton, ReceiptMenuItem } from '~/containers';
import { useInfiniteQuery } from '~/hooks';

const breadcrumb: BreadcrumbProps['routes'] = [
  {
    path: '/main',
    breadcrumbName: 'Home',
  },
  {
    path: '',
    breadcrumbName: 'Receipts',
  },
];

const Wrapper = styled.div`
  height: calc(100vh - 170px);
  overflow: auto;
`;

export const Receipts = () => {
  const navigate = useNavigate();
  const result = useInfiniteQuery(receiptsApiSlice.endpoints.getReceipts, {
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
        <Wrapper id="scrollableDiv">
          <InfiniteScroll
            dataLength={result.total}
            next={loadMoreData}
            hasMore={result.hasNextPage || !result.data}
            loader={<ListReceiptsSkeleton />}
            endMessage={<Divider plain> End of list receipts </Divider>}
            scrollableTarget="scrollableDiv"
          >
            <ConfigProvider renderEmpty={() => null}>
              <List
                className="mobile-menu"
                dataSource={result.data}
                loading={false}
                renderItem={(paginatedList) =>
                  paginatedList.content.map((item) => (
                    <List.Item key={item.id}>
                      <ReceiptMenuItem
                        item={item}
                        onClick={() => navigate(`/main/receipts/${item.id}`)}
                      />
                    </List.Item>
                  ))
                }
              ></List>
            </ConfigProvider>
          </InfiniteScroll>
        </Wrapper>
      </PageContent>
    </>
  );
};
