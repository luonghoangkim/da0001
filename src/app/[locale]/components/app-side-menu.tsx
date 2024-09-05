import { Link } from '@/i18n/routing';
import { Menu, Layout, Avatar, Tooltip } from 'antd';
import {
  DashboardOutlined,
  WalletOutlined,
  SwapOutlined,
  FileTextOutlined,
  DollarOutlined,
  FlagOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import React from 'react';

const { Sider } = Layout;

function AppSideMenu() {
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">DashBoard</Link>,
    },
    {
      key: 'expenditure',
      icon: <WalletOutlined />,
      label: <Link href="/expenditure">Expenditure</Link>,
    },
    {
      key: 'income',
      icon: <SwapOutlined />,
      label: <Link href="/income">Income</Link>,
    },
    // {
    //   key: 'bills',
    //   icon: <FileTextOutlined />,
    //   label: <Link href="/bills">Bills</Link>,
    // },
    // {
    //   key: 'expenses',
    //   icon: <DollarOutlined />,
    //   label: <Link href="/expenses">Expenses</Link>,
    // },
    // {
    //   key: 'goals',
    //   icon: <FlagOutlined />,
    //   label: <Link href="/goals">Goals</Link>,
    // },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: <Link href="/settings">Settings</Link>,
    },
  ];

  return (
    <Sider width={250} theme="dark" style={{ height: '100vh' }}>
      <div style={{ padding: '16px', color: 'white' }}>
        <h2 style={{ color: 'white' }}>MyFinanceManager</h2>
      </div>
      <Menu theme="dark" mode="inline" items={menuItems} />
      <div style={{ position: 'absolute', bottom: 0, width: '100%', padding: '16px' }}>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
          <Avatar src="https://example.com/avatar.jpg" />
          <div style={{ marginLeft: '8px', color: 'white' }}>
            <div>hoangkimluong</div>
            <Tooltip title="View profile">
              <a style={{ color: 'rgba(255,255,255,0.65)' }}>View profile</a>
            </Tooltip>
          </div>
        </div>
      </div>
    </Sider>
  );
}

export default AppSideMenu;