import { CodeSandboxOutlined, RightOutlined } from '@ant-design/icons';
import { Button, List } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetReceiptsQuery } from '~/api-slices';
import { ListReceiptsSkeleton, ReceiptMenuItem } from '~/containers';
import { DEFAULT_PAGE } from '~/core';

const StyledRightOutlined = styled(RightOutlined)`
  float: right;
  font-size: 20px;
`;

const StyledCodeSandboxOutlined = styled(CodeSandboxOutlined)`
  font-size: 20px;
  vertical-align: middle;
`;

const StyledButton = styled(Button)`
  min-height: inherit;
`;

interface Item {
  id: number;
  node: React.ReactNode;
}

export const ArchiveMenu = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { data: receipts, isFetching: areReceiptsFetching } =
    useGetReceiptsQuery({
      page: DEFAULT_PAGE,
      size: 3,
    });
  const navigate = useNavigate();

  useEffect(() => {
    const results: Item[] = [
      {
        id: 0,
        node: (
          <Link className="w-100" to="/main/receipts">
            <StyledButton
              className="w-100 text-start"
              type="text"
              icon={<StyledCodeSandboxOutlined />}
              onClick={showAllReceipts}
            >
              All Receipts
              <StyledRightOutlined />
            </StyledButton>
          </Link>
        ),
      },
    ];

    if (areReceiptsFetching) {
      results.push({
        id: -1,
        node: (
          <div className="w-100">
            <ListReceiptsSkeleton />
          </div>
        ),
      });
    } else {
      results.push(
        ...(receipts?.content || []).map((item) => ({
          id: item.id,
          node: (
            <ReceiptMenuItem
              item={item}
              onClick={() => navigate(`/main/receipts/${item.id}`)}
            />
          ),
        }))
      );
    }

    setItems(results);
  }, [receipts, areReceiptsFetching, navigate]);

  const showAllReceipts = () => {
    console.log('called', new Date().getTime());
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
