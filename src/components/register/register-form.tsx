'use client';

import { Form, Input, Button, Typography, Divider, message } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { REGISTER_SERVICE } from '../../service/register/register-service';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { toast } from 'react-toastify';
import { REGEX } from '@/utils/app-constant';
import { RegisterPayload, VerifyPayload } from '@/models/auth-modal/user.modal';

const { Title, Text } = Typography;

const RegisterForm = () => {
  const t = useTranslations('Register');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [email, setEmail] = useState<string>('');

  const isValidEmail = (email: string) => {
    const emailRgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    return emailRgx.test(email);
  };

  const onFinishRegister = async (values: any) => {
    const { account_name, email, password } = values;

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
      const payload: RegisterPayload = { account_name, email, password };
      const res = await REGISTER_SERVICE.register(payload);

      if (res.status === 400) {
        toast.error(t('emailExists'));
      } else if (res.status === 201) {
        toast.success(t('registerSuccess'));
        setEmail(email); // Lưu email để sử dụng ở bước xác minh
        setStep('verify');
      }
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          toast.error(t('emailExists'));
        } else {
          toast.error(t('errorOccurred'));
        }
      } else {
        toast.error(t('errorOccurred'));
      }
      console.log('AxiosError:', error);
    }
    setIsLoading(false);
  };

  const onFinishVerify = async (values: any) => {
    const { codeId } = values;

    if (!codeId || codeId.length !== 6) {
      toast.error(t('invalidCode'));
      return;
    }

    setIsLoading(true);

    try {
      const payload: VerifyPayload = { email, codeId };
      const res = await REGISTER_SERVICE.verify(payload);

      if (res.status === 200) {
        toast.success(t('verifySuccess'));
        router.push('/login');
      } else {
        toast.error(t('invalidCode'));
      }
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          toast.error(t('invalidCode'));
        } else {
          toast.error(t('errorOccurred'));
        }
      } else {
        toast.error(t('errorOccurred'));
      }
      console.log('AxiosError:', error);
    }
    setIsLoading(false);
  };

  return (
    <div style={{ width: '370px', margin: '0 auto', padding: '50px 20px', textAlign: 'center' }}>
      <Title level={3} style={{ color: '#37B29E', marginBottom: '40px' }}>MyFinanceManager.com</Title>

      {step === 'register' && (
        <>
          <Title level={4}>{t('signUp')}</Title>
          <Form layout="vertical" onFinish={onFinishRegister}>
            <Form.Item
              label={t('username')}
              name="account_name"
              rules={[
                { required: true, message: t('nameRequired') },
                {
                  pattern: REGEX.USERNAME,
                  message: t('usernameInvalid')
                }
              ]}
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
              rules={[
                { required: true, message: t('passwordRequired') },
                {
                  pattern: REGEX.PASSWORD,
                  message: t('passwordInvalid')
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
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
        </>
      )}

      {step === 'verify' && (
        <>
          <Title level={4}>{t('verifyEmail')}</Title>
          <Text>{t('verifyEmailDescription', { email })}</Text>
          <Form layout="vertical" onFinish={onFinishVerify} style={{ marginTop: '20px' }}>
            <Form.Item
              label={t('verificationCode')}
              name="codeId"
              rules={[
                { required: true, message: t('codeRequired') },
                { len: 6, message: t('codeLength') },
                {
                  pattern: /^\d{6}$/,
                  message: t('codeNumeric')
                }
              ]}
            >
              <Input placeholder="123456" maxLength={6} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block style={{ backgroundColor: '#37B29E' }} loading={isLoading}>
                {t('verify')}
              </Button>
            </Form.Item>
          </Form>
          <Button type="link" onClick={() => {
            message.info(t('resendCode'));
          }}>
            {t('resendCode')}
          </Button>
        </>
      )}
    </div>
  );
};

export default RegisterForm;
