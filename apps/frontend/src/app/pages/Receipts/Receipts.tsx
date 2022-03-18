import { FileOutlined } from '@ant-design/icons';
import { BreadcrumbProps, ConfigProvider, Divider, List } from 'antd';
import React, { useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { receiptsApiSlice } from '~/api-slices';
import { MenuItem, PageContent, PageHeader } from '~/components';
import { useInfiniteQuery } from '~/hooks';
import { ListReceiptsSkeleton } from './ListReceiptsSkeleton';

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
                      <MenuItem
                        title={item.title}
                        icon={<StyledFileOutlined />}
                        onClick={() => navigate(`/receipts/${item.id}`)}
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
