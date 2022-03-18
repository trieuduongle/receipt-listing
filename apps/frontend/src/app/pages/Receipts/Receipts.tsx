import { FileOutlined } from '@ant-design/icons';
import { BreadcrumbProps, List, Spin } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetReceiptsQuery } from '~/api-slices';
import { MenuItem, PageContent, PageHeader } from '~/components';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PaginationQuery } from '~/core';

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
  const navigate = useNavigate();
  const [pagination, setPagination] = useState<PaginationQuery>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
  });
  const { data: receipts, isLoading } = useGetReceiptsQuery({
    page: pagination.page,
    size: pagination.size,
  });

  return (
    <>
      <PageHeader title="Receipts" routes={breadcrumb}></PageHeader>

      <PageContent>
        <Spin spinning={isLoading}>
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
        </Spin>
      </PageContent>
    </>
  );
};
