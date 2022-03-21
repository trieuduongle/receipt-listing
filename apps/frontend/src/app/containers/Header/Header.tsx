import { Layout } from 'antd';
import styled from 'styled-components';
import { UserMenu } from './UserMenu';

const { Header: AntdHeader } = Layout;

export interface HeaderProps {
  isMenuFolded?: boolean;
  onFoldMenuIconClicked?: () => void;
}

const Flex = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  height: 100%;
  float: right;
`;

const StyledAntdHeader = styled(AntdHeader)`
  background-color: #fff;
  padding: 0;
  box-shadow: 0 1px 4px #00152914;
  z-index: 1;

  @media (max-width: 512px) {
    height: unset;
  }

  .trigger {
    padding: 0 24px;
    font-size: 18px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: ${({ theme }) => theme.primaryColor};
  }
`;

export const Header: React.FC<HeaderProps> = () => {
  return (
    <StyledAntdHeader>
      <Flex>
        <UserMenu />
      </Flex>
    </StyledAntdHeader>
  );
};
