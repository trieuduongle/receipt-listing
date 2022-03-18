import { RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledRightOutlined = styled(RightOutlined)`
  float: right;
  font-size: 20px;
`;

const StyledButton = styled(Button)`
  min-height: inherit;
`;

interface MenuItemProps {
  title: string;
  icon?: ReactNode;
  onClick: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ title, icon, onClick }) => {
  return (
    <StyledButton
      className="w-100 text-start"
      type="text"
      icon={icon}
      onClick={onClick}
    >
      {title}

      <StyledRightOutlined />
    </StyledButton>
  );
};
