import { FileOutlined } from '@ant-design/icons';
import { BreadcrumbProps, Spin } from 'antd';
import styled from 'styled-components';
import { PageContent, PageHeader } from '~/components';

const breadcrumb: BreadcrumbProps['routes'] = [
  {
    path: '/home',
    breadcrumbName: 'Home',
  },
  {
    path: '/receipts',
    breadcrumbName: 'Receipts',
  },
  {
    path: '',
    breadcrumbName: 'Receipt Detail',
  },
];

const StyledFileOutlined = styled(FileOutlined)`
  font-size: 20px;
  vertical-align: middle;
`;

export const ReceiptDetail = () => {
  const isLoading = false;

  return (
    <>
      <PageHeader title="Receipt Detail" routes={breadcrumb}></PageHeader>

      <PageContent>
        <Spin spinning={isLoading}>Detail page</Spin>
      </PageContent>
    </>
  );
};
