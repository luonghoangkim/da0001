'use client';

import { Form, Input, Button, Typography, Divider } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { signUp } from './service/sigup-service';
import { useTranslations } from 'next-intl';

const { Title, Text, Link } = Typography;

const SignupForm = () => {
  const t = useTranslations('Register');
  const [error, setError] = useState('');

  const isValidEmail = (email: string) => {
    const emailRgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    return emailRgx.test(email);
  };

  const onFinish = async (values: any) => {
    const { username, email, password } = values;

    if (!isValidEmail(email)) {
      setError(t('invalidEmail'));
      return;
    }

    if (!password) {
      setError(t('invalidPassword'));
      return;
    }

    try {
      const res = await signUp(username, email, password);

      if (res.status === 400) {
        setError(t('emailExists'));
      } else if (res.status === 200) {
        setError('');
      }
    } catch (error) {
      setError(t('errorOccurred'));
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '50px 20px', textAlign: 'center' }}>
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
          <Button type="primary" htmlType="submit" block style={{ backgroundColor: '#37B29E' }}>
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
      {error && <Text type="danger" style={{ marginTop: '10px' }}>{error}</Text>}
    </div>
  );
};

export default SignupForm;
