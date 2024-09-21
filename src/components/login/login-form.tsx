'use client';

import { Form, Input, Button, Typography, Divider } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { loginService } from '../../service/login/login-service';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { toast } from 'react-toastify';
import { LoginPayload } from '@/models/auth-modal/user.modal';

const { Title, Text } = Typography;

const LoginForm = () => {
  const t = useTranslations('Login');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    const { account_name, password } = values;

    if (!password) {
      toast.error(t('invalidPassword'));
      return;
    }
    setIsLoading(true);

    try {
      const payload: LoginPayload = { account_name, password };
      const res = await loginService(payload);
      const data = res.data;
      if (res.status === 201) {
        const { token } = data;
        localStorage.setItem('authToken', token);
        toast.success(t('loginSuccess'));
        router.push('/dashboard');
      } else {
        toast.error(t('loginErr'));
      }
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          toast.error(t('accountExists'));
        } else {
          toast.error(t('errorOccurred'));
        }
      } else {
        toast.error(t('errorOccurred'));
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-gradient-to-r from-white via-blue-200 to-blue-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold text-[#37B29E] mb-6">MyFinanceManager.com</h1>
        <h1 className="text-center text-xl font-semibold mb-4">{t('login')}</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={t('username')}
            name="account_name"
            rules={[{ required: true, message: t('usernameRequired') }]}
          >
            <Input className="border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" />
          </Form.Item>
          <Form.Item
            label={t('password')}
            name="password"
            rules={[{ required: true, message: t('passwordRequired') }]}
          >
            <Input.Password className="border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isLoading}
              style={{ backgroundColor: '#37B29E' }}
            >
              {t('login')}
            </Button>
          </Form.Item>
        </Form>
        <Divider>{t('orSignUpWith')}</Divider>
        <Button
          icon={<GoogleOutlined />}
          block
          className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          {t('continueWithGoogle')}
        </Button>
        <Text className="mt-4 block text-center">
          {t('notHaveAccount')} <Link href="/register" className="text-teal-500 hover:underline">{t('signUp')}</Link>
        </Text>
      </div>
    </div>
  );
};

export default LoginForm;
