import { Button, Dropdown, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetReceiptsQuery } from '~/api-slices';
import { AuthService, DEFAULT_PAGE } from '~/core';
import { useAuth } from '~/hooks';
import { ScoreBadge } from '../ScoreBadge';

const Content = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const WelcomeUser = styled.span`
  margin-top: 0.5rem;
`;

interface UserMenuProps {
  hideName?: boolean;
}

export const UserMenu: React.FC<UserMenuProps> = ({ hideName }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const { data: receipts } = useGetReceiptsQuery({
    page: DEFAULT_PAGE,
    size: 3,
  });

  const handleLogout = () => {
    AuthService.clearToken();
    navigate('/login');
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="profile">
            <Link to="profile">
              <Button type="link">Profile</Button>
            </Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <Button type="link" onClick={handleLogout}>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      }
      placement="bottomLeft"
      trigger={['click']}
    >
      <Content>
        <ScoreBadge count={receipts?.totalElements}>
          {auth.profile ? (
            <WelcomeUser>
              Hello, {auth.profile?.firstName} {auth.profile?.lastName}
            </WelcomeUser>
          ) : null}
        </ScoreBadge>
      </Content>
    </Dropdown>
  );
};
