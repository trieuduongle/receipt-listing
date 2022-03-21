import { skipToken } from '@reduxjs/toolkit/dist/query';
import { BreadcrumbProps, Form, Image, Input, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  useGetReceiptDetailQuery,
  useGetReceiptMediaDetailsQuery,
} from '~/api-slices';
import { Centering, PageContent, PageHeader } from '~/components';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, FALLBACK_IMAGE_SRC } from '~/core';

const breadcrumb: BreadcrumbProps['routes'] = [
  {
    path: '/main',
    breadcrumbName: 'Home',
  },
  {
    path: '/main/receipts',
    breadcrumbName: 'Receipts',
  },
  {
    path: '',
    breadcrumbName: 'Receipt Detail',
  },
];

const Wrapper = styled.div`
  width: 80vw;
  margin: 0 auto;

  @media (max-width: 576px) {
    width: 100%;
  }
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
        <Wrapper>
          <Spin spinning={isLoading}>
            <Centering>
              <Image
                src={medias?.content[0].url}
                fallback={FALLBACK_IMAGE_SRC}
              />
            </Centering>

            <Form layout="vertical" className="mt-3">
              <Form.Item label="Title">
                <Input value={receipt?.title} disabled />
              </Form.Item>
            </Form>
          </Spin>
        </Wrapper>
      </PageContent>
    </>
  );
};
