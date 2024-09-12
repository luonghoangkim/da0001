'use client';

import { useState, useEffect } from 'react';
import { Tabs, Form, Input, Button, } from 'antd';
import React from 'react';
import TabPane from 'antd/es/tabs/TabPane';
import { EnvironmentOutlined, HeartOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { getUser } from './service/setting-service';


const ProfileForm = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);

  // Mock data, replace with actual API call
  const [profileData, setProfileData] = useState({
    fullName: 'Tanzir Rahman',
    email: 'tanzir.rahman@email.com',
    phoneNumber: '+880 | 51547 58868',
    addressUser: 'Bien Hoa - Dong Nai',
    genderUser: 'Nam'
  });

  const handleUpdateProfile = (values: any) => {
    console.log('Updated Profile Values:', values);
    // Here, send the updated values to your API
  };

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await getUser();

      if (response && response.transactions) {

      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Account" key="1">
        <Form
          form={form}
          layout="vertical"
          initialValues={profileData}
          onFinish={handleUpdateProfile}
          className="max-w-2xl m-auto"
        >
          <Form.Item label="Full name" name="fullName" className="mb-4" >
            <Input
              prefix={<UserOutlined />}
              value={profileData.fullName}
            />
          </Form.Item>

          <Form.Item label="Email" name="email" className="mb-4">
            <Input
              prefix={<MailOutlined />}
              value={profileData.email}
            />
          </Form.Item>

          <Form.Item label="Phone Number" name="phoneNumber" className="mb-4">
            <Input
              prefix={<PhoneOutlined />}
              value={profileData.phoneNumber}
            />
          </Form.Item>

          <Form.Item label="Address" name="addressUser" className="mb-4">
            <Input
              prefix={<EnvironmentOutlined />}
              value={profileData.addressUser}
            />
          </Form.Item>

          <Form.Item label="Gender" name="genderUser" className="mb-4">
            <Input
              prefix={<HeartOutlined />}
              value={profileData.genderUser}
            />
          </Form.Item>

          <Form.Item >
            <Button type="primary" htmlType="submit" >
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </TabPane>

      <TabPane tab="Security" key="2" className="mt-4">
        <div>Security settings go here...</div>
      </TabPane>
    </Tabs>
  );
};

export default ProfileForm;
