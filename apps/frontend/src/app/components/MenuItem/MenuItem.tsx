import { RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledRightOutlined = styled(RightOutlined)`
  font-size: 20px;
`;

const StyledButton = styled(Button)`
  min-height: inherit;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface MenuItemProps {
  title: string;
  icon?: ReactNode;
  onClick: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  title,
  icon,
  onClick,
  children,
}) => {
  return (
    <StyledButton
      className="w-100 text-start"
      type="text"
      icon={icon}
      onClick={onClick}
    >
      {children}
      {title}

      <StyledRightOutlined />
    </StyledButton>
  );
};
