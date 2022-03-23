import { UserOutlined } from '@ant-design/icons';
import { BreadcrumbProps, Card, Form, Input, Spin } from 'antd';
import styled from 'styled-components';
import { PageContent, PageHeader } from '~/components';
import { useAuth } from '~/hooks';

const breadcrumb: BreadcrumbProps['routes'] = [
  {
    path: '/main',
    breadcrumbName: 'Home',
  },
  {
    path: '',
    breadcrumbName: 'Profile',
  },
];

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 578px;
  margin: 0 auto;
  position: relative;
`;

const ProfileIcon = styled(UserOutlined)`
  font-size: 30px;
  top: 0;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  background: red;
  border-radius: 50%;
  padding: 12px;
  background: #e8eef3;
  color: grey;
`;

export const Profile = () => {
  const auth = useAuth();

  return (
    <>
      <PageHeader title="Profile" routes={breadcrumb}></PageHeader>

      <PageContent>
        <Spin spinning={auth.isFetching}>
          <StyledCard>
            <ProfileIcon />
            <Form layout="vertical" name="profile-form" autoComplete="off">
              <Form.Item label="Username">
                <Input
                  prefix={<UserOutlined />}
                  disabled={true}
                  value={auth.profile?.username}
                />
              </Form.Item>

              <Form.Item label="First Name">
                <Input disabled value={auth.profile?.firstName} />
              </Form.Item>

              <Form.Item label="Last Name">
                <Input disabled value={auth.profile?.lastName} />
              </Form.Item>
            </Form>
          </StyledCard>
        </Spin>
      </PageContent>
    </>
  );
};
