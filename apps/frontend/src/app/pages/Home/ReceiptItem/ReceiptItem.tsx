import { FileOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styled from 'styled-components';
import { ReceiptModel } from '~/core';

const StyledRightOutlined = styled(RightOutlined)`
  float: right;
  font-size: 20px;
`;

const StyledFileOutlined = styled(FileOutlined)`
  font-size: 20px;
  vertical-align: middle;
`;

interface ReceiptItemProps {
  receipt: ReceiptModel;
  openReceipt: (model: ReceiptModel) => void;
}

export const ReceiptItem: React.FC<ReceiptItemProps> = ({
  receipt,
  openReceipt,
}) => {
  return (
    <Button
      className="w-100 text-start"
      type="text"
      icon={<StyledFileOutlined />}
      onClick={() => openReceipt(receipt)}
    >
      {receipt.name}

      <StyledRightOutlined />
    </Button>
  );
};
