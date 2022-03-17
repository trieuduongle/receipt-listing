import { CodeSandboxOutlined, RightOutlined } from '@ant-design/icons';
import { Button, List } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  id: number;
  node: React.ReactNode;
}

const receipts: ReceiptModel[] = [
  {
    id: 1,
    title: 'Receipt 1',
    media: [],
  },
  {
    id: 2,
    title: 'Receipt 2',
    media: [],
  },
  {
    id: 3,
    title: 'Receipt 3',
    media: [],
  },
  {
    id: 4,
    title: 'Receipt 4',
    media: [],
  },
];

export const ArchiveMenu = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems([
      {
        id: 0,
        node: (
          <Link className="w-100" to="/receipts">
            <Button
              className="w-100 text-start"
              type="text"
              icon={<StyledCodeSandboxOutlined />}
              onClick={showAllReceipts}
            >
              All Receipts
              <StyledRightOutlined />
            </Button>
          </Link>
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
