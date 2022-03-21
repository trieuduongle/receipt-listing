import { List } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '~/components';

interface Item {
  id: string;
  node: React.ReactNode;
}

export const UploadReceiptMenu = () => {
  const [items, setItems] = useState<Item[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setItems([
      {
        id: 'selectImage',
        node: (
          <MenuItem
            title="Upload your receipt"
            onClick={() => navigate('/main/receipts/upload')}
          />
        ),
      },
    ]);
  }, [navigate]);

  return (
    <List
      className="mobile-menu"
      header={<div>Add to archive</div>}
      dataSource={items}
      renderItem={(item) => <List.Item key={item.id}>{item.node}</List.Item>}
    ></List>
  );
};
