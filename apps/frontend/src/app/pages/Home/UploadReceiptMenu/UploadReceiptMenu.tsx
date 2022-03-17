import { UploadOutlined } from '@ant-design/icons';
import { Button, List } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  useGeneratePresignUrlMutation,
  useUploadMediaMutation,
} from '~/api-slices';

const StyledUploadOutlined = styled(UploadOutlined)`
  font-size: 20px;
  vertical-align: middle;
`;

const StyledButton = styled(Button)`
  min-height: inherit;
`;

interface Item {
  id: string;
  node: React.ReactNode;
}

export const UploadReceiptMenu = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [generatePresignUrl, { isLoading, isSuccess }] =
    useGeneratePresignUrlMutation();
  const [updateMedias] = useUploadMediaMutation();

  const handleImageChanged = useCallback(
    async (file: File, extension: string) => {
      // TODO: Handle error case
      const presignUrlRes = await generatePresignUrl({ extension });
      // if ('data' in presignUrlRes) {
      //   const res = await updateMedias({
      //     url: 'https://my-test-bucket-ap-south.s3.ap-southeast-1.amazonaws.com/7cf3579e-0518-44b8-9066-c716afde3884.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220316T072527Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Credential=AKIA4IBKT6CDCW5YQU66%2F20220316%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=360119498340c6b721a9ce784ee4038fc77d320be992fb6940ce688008438c96',
      //     file,
      //   });
      // }
      // const res = await updateMedias({
      //   url: 'https://my-test-bucket-ap-south.s3.ap-southeast-1.amazonaws.com/7cf3579e-0518-44b8-9066-c716afde3884.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220316T072527Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Credential=AKIA4IBKT6CDCW5YQU66%2F20220316%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=360119498340c6b721a9ce784ee4038fc77d320be992fb6940ce688008438c96',
      //   file,
      // });
      console.log('handleImageChanged', new Date().getTime());
    },
    [generatePresignUrl, updateMedias]
  );

  useEffect(() => {
    setItems([
      {
        id: 'selectImage',
        node: (
          <Link className="w-100" to="/receipts/upload">
            <StyledButton
              className="w-100 text-start"
              type="text"
              icon={<StyledUploadOutlined />}
            >
              Upload your receipt
            </StyledButton>
          </Link>
        ),
      },
    ]);
  }, [handleImageChanged]);

  return (
    <List
      className="mobile-menu"
      header={<div>Add to archive</div>}
      dataSource={items}
      renderItem={(item) => <List.Item key={item.id}>{item.node}</List.Item>}
    ></List>
  );
};
