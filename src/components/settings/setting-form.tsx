import React, { useState, useEffect } from 'react';
import { Tabs, Form, Input, Button, Spin, Select } from 'antd';
import { EnvironmentOutlined, MailOutlined, ManOutlined, PhoneOutlined, UserOutlined, WomanOutlined, LockOutlined, GlobalOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { changePassword, SETTING_SERVICE } from '@/service/settings/settings-service';
import Image from 'next/image'
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from 'next-intl';
import { UpdateUserPayload } from '@/models/auth-modal/user.modal';
import { REGEX } from '@/utils/app-constant';


const { TabPane } = Tabs;
const { Option } = Select;

const SettingsTabs = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('Setting');
  const commonLanguage = useTranslations('CommonLanguage');

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLanguageChange = (value: any) => {
    router.replace(pathname, { locale: value });
  };

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await SETTING_SERVICE.getUser();
      const user = response.data;

      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error(t('errorFetchingUserInfo'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (values: UpdateUserPayload) => {
    setIsSubmitting(true);

    try {
      const payload: UpdateUserPayload = values;
      await SETTING_SERVICE.updateUser(payload);
      toast.success(t('updateProfileSuccess'));
    } catch (error) {
      console.error('Error updating:', error);
      toast.error(t('errorUpdatingProfile'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (values: any) => {
    setIsSubmitting(true);
    try {
      const payload = {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      };

      await changePassword(payload);

      toast.success(t('passwordChangeSuccess'));
      passwordForm.resetFields();
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error(t('errorChangingPassword'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeLanguage = (language: any) => {
    // Implement language change logic here
    console.log(`Language changed to: ${language}`);
    toast.success(t('languageChangeSuccess', { language: language === 'vi' ? 'Tiếng Việt' : 'English' }));
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="p-4 bg-white rounded-md shadow-md h-full w-full">
      <Tabs defaultActiveKey="profile">
        <TabPane tab={t('personalInfo')} key="profile">
          <Spin spinning={isLoading}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleUpdateProfile}
              className="max-w-2xl m-auto"
            >
              <Form.Item style={{ width: 300 }} label={t('fullName')} name="name" className="mb-4"
                rules={[
                  { required: true, message: t('nameRequired') },
                ]}>
                <Input prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                style={{ width: 300 }}
                label={t('email')}
                name="email"
                rules={[
                  { required: true, message: t('emailRequired') },
                  {
                    type: 'email',
                    message: t('emailInvalid')
                  },
                ]}
              >
                <Input prefix={<MailOutlined />} />
              </Form.Item>

              <Form.Item style={{ width: 300 }} label={t('phoneNumber')} name="phone" className="mb-4">
                <Input prefix={<PhoneOutlined />} />
              </Form.Item>

              <Form.Item style={{ width: 300 }} label={t('address')} name="address" className="mb-4">
                <Input prefix={<EnvironmentOutlined />} />
              </Form.Item>

              <Form.Item style={{ width: 300 }} label={t('gender')} name="gender" className="mb-4">
                <Select placeholder={t('selectGender')}>
                  <Option value={true}>
                    <ManOutlined /> {t('male')}
                  </Option>
                  <Option value={false}>
                    <WomanOutlined /> {t('female')}
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                  {t('updateProfile')}
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </TabPane>
        <TabPane tab={t('security')} key="security">
          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={handleChangePassword}
            className="max-w-2xl m-auto"
          >
            <Form.Item
              label={t('currentPassword')}
              name="currentPassword"
              style={{ width: 300 }}
              rules={[{ required: true, message: t('pleaseEnterCurrentPassword') }]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item
              label={t('newPassword')}
              name="newPassword"
              style={{ width: 300 }}
              rules={[{ required: true, message: t('pleaseEnterNewPassword') }]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item
              label={t('confirmNewPassword')}
              name="confirmPassword"
              style={{ width: 300 }}
              dependencies={['newPassword']}
              rules={[
                { required: true, message: t('pleaseConfirmNewPassword') },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(t('passwordMismatch')));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                {t('changePassword')}
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab={t('system')} key="system">
          <div className=" m-auto">
            <h2 className="text-lg font-semibold mb-4">{t('systemSettings')}</h2>
            <Form layout="vertical">
              <Form.Item label={t('language')} name="language">
                <Select
                  value={locale}
                  style={{ width: 150 }}
                  onChange={handleLanguageChange}
                  options={[
                    {
                      label: (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Image src={"/VNFlag.png"} className="mr-2" alt="Vietnam Flag" width={20} height={15} />
                          Tiếng Việt
                        </div>
                      ),
                      value: 'vi'
                    },
                    {
                      label: (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Image src={'/ENFlag.png'} className="mr-2" alt="UK Flag" width={20} height={15} />
                          English
                        </div>
                      ),
                      value: 'en'
                    },
                  ]}
                />
              </Form.Item>
            </Form>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SettingsTabs;