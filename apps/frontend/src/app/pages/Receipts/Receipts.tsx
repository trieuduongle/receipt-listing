import { FileOutlined } from '@ant-design/icons';
import { BreadcrumbProps, Spin } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import { useGetReceiptsQuery } from '~/api-slices';
import { MenuItem, PageContent, PageHeader } from '~/components';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PaginationQuery,
  ReceiptModel,
} from '~/core';

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
  const [pagination, setPagination] = useState<PaginationQuery>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
  });
  const { data: receipts, isLoading } = useGetReceiptsQuery({
    page: pagination.page,
    size: pagination.size,
  });

  const handleMenuItemClicked = (item: ReceiptModel) => {
    console.log(item);
  };

  return (
    <>
      <PageHeader title="Receipts" routes={breadcrumb}></PageHeader>

      <PageContent>
        <Spin spinning={isLoading}>
          {receipts?.content.map((item) => (
            <MenuItem
              title={item.title}
              icon={<StyledFileOutlined />}
              onClick={() => handleMenuItemClicked(item)}
            />
          ))}
        </Spin>
      </PageContent>
    </>
  );
};
