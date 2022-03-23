import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, FormProps, Input, notification } from 'antd';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  RENEW_AFTER_LOGIN,
  rootApiSlice,
  useLoginMutation,
} from '~/api-slices';
import { AuthService, LoginCommand } from '~/core';
import { useAppDispatch, useAuth } from '~/hooks';

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  background-color: #e8eef3;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 578px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CardTitle = styled.div`
  text-align: center;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const StyledForm = styled((props: FormProps) => <Form {...props} />)`
  max-width: 578px;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  display: block;
`;

const Register = styled.div`
  margin-top: 0.5rem;
  text-align: center;
`;

export const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading: isLoggingLoading, error }] = useLoginMutation();

  const isLoading = auth.isFetching || isLoggingLoading;

  useEffect(() => {
    if (!auth.isFetching && auth.profile) {
      navigate('/main');
    }
  }, [auth, navigate]);

  useEffect(() => {
    dispatch(rootApiSlice.util.invalidateTags([RENEW_AFTER_LOGIN]));
  }, [dispatch]);

  useEffect(() => {
    if (error && 'data' in error && error.status === 401) {
      notification.error({
        message: 'Your login info incorrect. Please check it again',
      });
    }
  }, [error]);

  const onFinish = async (values: LoginCommand) => {
    const res = await login(values);
    if ('data' in res) {
      AuthService.saveToken(res.data.accessToken);
      navigate('/main');
    }
  };

  return (
    <Wrapper>
      <StyledCard
        title={
          <CardTitle>
            Welcome to
            <Logo>Offline Receipt</Logo>
          </CardTitle>
        }
      >
        <StyledForm name="login-form" onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="usernameOrEmail"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item>
            <StyledButton
              loading={isLoading}
              type="primary"
              htmlType="submit"
              size="large"
            >
              Log in
            </StyledButton>
            <Register>
              Or
              <Link to="/register"> register now!</Link>
            </Register>
          </Form.Item>
        </StyledForm>
      </StyledCard>
    </Wrapper>
  );
};
