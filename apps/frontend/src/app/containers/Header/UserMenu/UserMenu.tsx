import { CaretDownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthService } from '~/core';
import { useAppDispatch, useAuth } from '~/hooks';

const Content = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

interface UserMenuProps {
  hideName?: boolean;
}

export const UserMenu: React.FC<UserMenuProps> = ({ hideName }) => {
  // TODO: update header items
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // dispatch(logout());
    AuthService.clearToken();
    navigate('/login');
  };

  return (
    <Dropdown
      overlay={
        <Menu>
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
        {auth.profile ? (
          <>
            Hello, {auth.profile?.firstName} {auth.profile?.lastName}
          </>
        ) : null}
        <CaretDownOutlined className="ms-2 me-2" />
      </Content>
    </Dropdown>
  );
};
