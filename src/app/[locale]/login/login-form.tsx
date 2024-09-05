'use client';

import { Form, Input, Button, Typography, Divider } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { loginService } from './service/login-service';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const { Title, Text } = Typography;

const LoginForm = () => {
  const t = useTranslations('Login');
  const [error, setError] = useState('');
  const router = useRouter();

  const isValidEmail = (email: string) => {
    const emailRgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    return emailRgx.test(email);
  };

  const onFinish = async (values: any) => {
    const { email, password } = values;

    if (!isValidEmail(email)) {
      setError(t('invalidEmail'));
      toast.error(t('invalidEmail'));  
      return;
    }

    if (!password) {
      setError(t('invalidPassword'));
      toast.error(t('invalidPassword'));  
      return;
    }

    try {
      const res = await loginService(email, password);

      if (res.status === 404) {
        setError(t('emailExists'));
        toast.error(t('emailExists'));  
      } else if (res.status === 401) {
        setError(t('wrongPassword'));
        toast.error(t('wrongPassword')); 
      }else if (res.status === 200) {
        setError('');
        toast.success(t('loginSuccess')); 
        router.push('/dashboard');
      }else{
        setError(t('loginErr'));
        toast.error(t('loginErr')); 
      }
    } catch (error) {
      setError(t('errorOccurred'));
      toast.error(t('errorOccurred')); 
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '50px 20px', textAlign: 'center' }}>
      <ToastContainer />
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
          <Button type="primary" htmlType="submit" block style={{ backgroundColor: '#37B29E' }}>
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
