import styled from 'styled-components';
import { MenuItem } from '~/components';
import { ReceiptModel } from '~/core';

const StyledImageIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
`;

export interface ReceiptMenuItemProps {
  item: ReceiptModel;
  onClick: (receipt: ReceiptModel) => void;
}

export const ReceiptMenuItem: React.FC<ReceiptMenuItemProps> = ({
  item,
  onClick,
}) => {
  return (
    <MenuItem
      title={item.title}
      icon={<StyledImageIcon src={item.media[0].url} />}
      onClick={() => onClick(item)}
    />
  );
};
