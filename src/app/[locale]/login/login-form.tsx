'use client';

import { Form, Input, Button, Typography, Divider } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { loginService } from './service/login-service';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { toast } from 'react-toastify';

const { Title, Text } = Typography;

const LoginForm = () => {
  const t = useTranslations('Login');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isValidEmail = (email: string) => {
    const emailRgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    return emailRgx.test(email);
  };

  const onFinish = async (values: any) => {
    const { email, password } = values;

    if (!isValidEmail(email)) {
      toast.error(t('invalidEmail'));
      return;
    }

    if (!password) {
      toast.error(t('invalidPassword'));
      return;
    }
    setIsLoading(true);

    try {
      const res = await loginService(email, password);
      const data = await res.json();
      console.log({ res });
      if (res.status === 404) {
        toast.error(t('emailExists'));
      } else if (res.status === 401) {
        toast.error(t('wrongPassword'));
      } else if (res.status === 200) {
        const { token } = data;
        localStorage.setItem('authToken', token);
        toast.success(t('loginSuccess'));
        router.push('/dashboard');
      } else {
        toast.error(t('loginErr'));
      }
    } catch (error) {
      toast.error(t('errorOccurred'));
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '50px 20px', textAlign: 'center' }}>
      <Title level={3} style={{ color: '#37B29E', marginBottom: '40px' }}>MyFinanceManager.com</Title>
      <Title level={4}>{t('login')}</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={t('email')}
          name="email"
          rules={[{ required: true, message: t('emailRequired') }]}
        >
          <Input placeholder="hello@example.com" />
        </Form.Item>
        <Form.Item
          label={t('password')}
          name="password"
          rules={[{ required: true, message: t('passwordRequired') }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block style={{ backgroundColor: '#37B29E' }} loading={isLoading}>
            {t('login')}
          </Button>
        </Form.Item>
      </Form>
      <Divider>{t('orSignUpWith')}</Divider>
      <Button icon={<GoogleOutlined />} block >
        {t('continueWithGoogle')}
      </Button>
      <Text style={{ marginTop: '20px', display: 'block' }}>
        {t('notHaveAccount')} <Link href="/register">{t('signUp')}</Link>
      </Text>
    </div>
  );
};

export default LoginForm;
