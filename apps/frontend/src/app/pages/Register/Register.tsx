import { UserOutlined } from '@ant-design/icons';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Button, Card, Form, FormProps, Input, notification } from 'antd';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRegisterMutation } from '~/api-slices';
import { AuthService, RegisterCommand } from '~/core';
import { useAuth } from '~/hooks';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e8eef3;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 578px;
`;

const CardTitle = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

const StyledForm = styled((props: FormProps) => <Form {...props} />)`
  max-width: 578px;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;

  div.ant-form-item-explain .ant-form-item-explain-error:not(:first-child) {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  display: block;
`;

const LoginSuggestion = styled.div`
  margin-top: 0.5rem;
  text-align: center;
`;

const fieldToTextDict: { [key: string]: string } = {
  email: 'Email',
  firstName: 'First Name',
  lastName: 'Last Name',
  username: 'Username',
};

export const Register = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const isLoading = auth.isFetching || isRegisterLoading;

  useEffect(() => {
    AuthService.clearToken();
  }, []);

  const onFinish = async (values: RegisterCommand) => {
    const res = await register(values);
    if ('data' in res) {
      notification.success({
        message: 'Congrats! Your account created.',
      });
      navigate('/login');
    } else {
      const errorData = (res.error as FetchBaseQueryError).data as any;
      const error = errorData?.errors?.[0] || errorData.message;
      let message = '';
      if (typeof error === 'string') {
        message = error;
      } else if (error) {
        const { field, defaultMessage } = error;
        message = `Field ${
          fieldToTextDict[field] || field
        } invalid because ${defaultMessage}`;
      } else {
        message = 'Your provided info invalid, please recheck it again.';
      }
      notification.error({
        message,
      });
    }
  };

  return (
    <Wrapper>
      <StyledCard title={<CardTitle>Register Account</CardTitle>}>
        <StyledForm
          layout="vertical"
          name="register-form"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} disabled={isLoading} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              { min: 6, message: 'Password must be minimum 6 characters.' },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, type: 'email', message: 'Email is not valid' },
            ]}
          >
            <Input disabled={isLoading} />
          </Form.Item>

          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: 'Please input your first name!' },
              { min: 2, message: 'First name must be minimum 2 characters.' },
              { max: 40, message: 'First name must be maximum 40 characters.' },
            ]}
          >
            <Input disabled={isLoading} />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: 'Please input your last name!' },
              { min: 2, message: 'Last name must be minimum 2 characters.' },
              { max: 40, message: 'Last name must be maximum 40 characters.' },
            ]}
          >
            <Input disabled={isLoading} />
          </Form.Item>

          <Form.Item>
            <StyledButton
              loading={isLoading}
              type="primary"
              htmlType="submit"
              size="large"
            >
              Register
            </StyledButton>
            <LoginSuggestion>
              Or
              <Link to="/login"> login!</Link>
            </LoginSuggestion>
          </Form.Item>
        </StyledForm>
      </StyledCard>
    </Wrapper>
  );
};
