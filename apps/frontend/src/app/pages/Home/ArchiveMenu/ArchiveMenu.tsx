import { CodeSandboxOutlined, RightOutlined } from '@ant-design/icons';
import { Button, List } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReceiptModel } from '~/core';
import { ReceiptItem } from '../ReceiptItem';

const StyledRightOutlined = styled(RightOutlined)`
  float: right;
  font-size: 20px;
`;

const StyledCodeSandboxOutlined = styled(CodeSandboxOutlined)`
  font-size: 20px;
  vertical-align: middle;
`;

interface Item {
  id: string;
  node: React.ReactNode;
}

const receipts: ReceiptModel[] = [
  {
    id: '1',
    name: 'Receipt 1',
    src: 'src 1',
  },
  {
    id: '2',
    name: 'Receipt 2',
    src: 'src 2',
  },
  {
    id: '3',
    name: 'Receipt 3',
    src: 'src 3',
  },
  {
    id: '4',
    name: 'Receipt 4',
    src: 'src 4',
  },
];

export const ArchiveMenu = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems([
      {
        id: 'allReceipts',
        node: (
          <Button
            className="w-100 text-start"
            type="text"
            icon={<StyledCodeSandboxOutlined />}
            onClick={showAllReceipts}
          >
            All Receipts
            <StyledRightOutlined />
          </Button>
        ),
      },
      ...receipts.map((item) => ({
        id: item.id,
        node: <ReceiptItem receipt={item} openReceipt={handleOpenReceipt} />,
      })),
    ]);
  }, []);

  const showAllReceipts = () => {
    console.log('called', new Date().getTime());
  };

  const handleOpenReceipt = () => {
    console.log('open receipt');
  };

  return (
    <List
      className="mobile-menu"
      header={<div>Archive</div>}
      dataSource={items}
      renderItem={(item) => <List.Item key={item.id}>{item.node}</List.Item>}
    ></List>
  );
};
