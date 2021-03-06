import styled from 'styled-components';
import { Ellipsis, MenuItem } from '~/components';
import { ReceiptModel } from '~/core';

const StyledImageIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 0.5rem;
  object-fit: cover;
  border-radius: 20%;
`;

const StyledEllipsis = styled(Ellipsis)`
  flex: 1;
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
      title=""
      icon={<StyledImageIcon src={item.media[0].url} />}
      onClick={() => onClick(item)}
    >
      <StyledEllipsis text={item.title} />
    </MenuItem>
  );
};
