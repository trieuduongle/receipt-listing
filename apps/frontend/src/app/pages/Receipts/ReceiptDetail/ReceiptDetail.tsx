import { FileOutlined } from '@ant-design/icons';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { BreadcrumbProps, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  useGetReceiptDetailQuery,
  useGetReceiptMediaDetailsQuery,
} from '~/api-slices';
import { PageContent, PageHeader } from '~/components';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '~/core';

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
  const params = useParams();
  const id = Number(params['id']);
  const { data: receipt, isFetching: isReceiptFetching } =
    useGetReceiptDetailQuery(id ? id : skipToken);
  const { data: medias, isFetching: areMediasFetching } =
    useGetReceiptMediaDetailsQuery(
      id
        ? { receiptId: id, page: DEFAULT_PAGE, size: DEFAULT_PAGE_SIZE }
        : skipToken
    );
  const isLoading = isReceiptFetching || areMediasFetching;

  return (
    <>
      <PageHeader title="Receipt Detail" routes={breadcrumb}></PageHeader>

      <PageContent>
        <Spin spinning={isLoading}>{JSON.stringify(receipt)}</Spin>
        <Spin spinning={isLoading}>{JSON.stringify(medias)}</Spin>
      </PageContent>
    </>
  );
};
