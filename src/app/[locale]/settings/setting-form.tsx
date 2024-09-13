'use client';

import { useState, useEffect } from 'react';
import { Form, Input, Button, Spin, Select } from 'antd';
import { EnvironmentOutlined, MailOutlined, ManOutlined, PhoneOutlined, UserOutlined, WomanOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { getUser, updateUser } from './service/setting-service';
import { useTranslations } from 'next-intl';


const { Option } = Select;

const SettingForm = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('Setting');
  const commonLanguage = useTranslations('CommonLanguage');



  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await getUser();
      const { user } = response;

      form.setFieldsValue({
        fullName: user.username, // Ví dụ nếu trường là username
        email: user.email,
        phoneNumber: user.phone_number || '', // Đảm bảo rằng các trường không null
        addressUser: user.address ? `${user.address.street}, ${user.address.city}` : '', // Định dạng địa chỉ
        genderUser: user.gender === 'male' ? 'Nam' : 'Nữ', // Đảm bảo giá trị chọn trùng khớp
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('Có lỗi xảy ra khi lấy thông tin người dùng.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (values: any) => {
    setIsSubmitting(true);
    const payload = {
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phoneNumber || null,
      addressUser: values.addressUser || null,
      genderUser: values.genderUser === 'Nam' ? 'male' : 'female',
    };

    try {
      await updateUser(
        payload.fullName,
        payload.email,
        payload.phoneNumber,
        payload.addressUser,
        payload.genderUser
      );
      toast.success(commonLanguage('updateInforSuccess'));
    } catch (error) {
      console.error('Error updating:', error);
      toast.error('Có lỗi xảy ra khi cập nhật thông tin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdateProfile}
        className="max-w-2xl m-auto"
      >
        <Form.Item label={t('fullName')} name="fullName" className="mb-4">
          <Input prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item label="Email" name="email" className="mb-4">
          <Input prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item label={t('phoneNumber')} name="phoneNumber" className="mb-4">
          <Input prefix={<PhoneOutlined />} />
        </Form.Item>

        <Form.Item label={t('address')} name="addressUser" className="mb-4">
          <Input prefix={<EnvironmentOutlined />} />
        </Form.Item>

        <Form.Item label={t('gender')} name="genderUser" className="mb-4">

          <Select placeholder="Chọn giới tính" className='flex items-center'>
            <Option value="Nam" className='flex items-center'>
              <ManOutlined className='mr-2' />
              <span className='ml-2'>{t('male')}</span>
            </Option>
            <Option value="Nữ" prefix='' className='flex items-center'>
              <WomanOutlined className='mr-2' />
              <span className='mr-2'>{t('female')}</span>
            </Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default SettingForm;
