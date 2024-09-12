'use client';

import { Form, Input, Button, Typography, Divider } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { signUp } from './service/sigup-service';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { toast } from 'react-toastify'; 


const { Title, Text } = Typography;

const RegisterForm = () => {
  const t = useTranslations('Register');
  const [isLoading, setIsLoading] = useState(false);


  const isValidEmail = (email: string) => {
    const emailRgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    return emailRgx.test(email);
  };

  const onFinish = async (values: any) => {
    const { username, email, password } = values;

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
      const res = await signUp(username, email, password);

      if (res.status === 400) {
        toast.error(t('emailExists')); 
      } else if (res.status === 200) {
        toast.success(t('registerSuccess')); 
      }
    } catch (error) {
      toast.error(t('errorOccurred')); 
    }
    setIsLoading(false);
  };

  return (
    <div style={{ width: '370px', margin: '0 auto', padding: '50px 20px', textAlign: 'center' }}>
      <Title level={3} style={{ color: '#37B29E', marginBottom: '40px' }}>MyFinanceManager.com</Title>
      <Title level={4}>{t('signUp')}</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={t('username')}
          name="username"
          rules={[{ required: true, message: t('nameRequired') }]}
        >
          <Input placeholder="abcxyz" />
        </Form.Item>
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
        {/* <Text style={{ display: 'block', marginBottom: '20px' }}>
          {t('agreeTerms')} <Link href="/terms">{t('termsOfService')}</Link>.
        </Text> */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block style={{ backgroundColor: '#37B29E' }} loading={isLoading}>
            {t('signUp')}
          </Button>
        </Form.Item>
      </Form>
      <Divider>{t('orSignUpWith')}</Divider>
      <Button icon={<GoogleOutlined />} block >
          {t('continueWithGoogle')}
        </Button>
      <Text style={{ marginTop: '20px', display: 'block' }}>
        {t('alreadyHaveAccount')} <Link href="/login">{t('signInHere')}</Link>
      </Text>
    </div>
  );
};

export default RegisterForm;
