import { ReactNode, useState } from 'react';
import AppSideMenu from '../../components/app-layout/app-side-menu';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import HeaderComponent from '../../components/app-layout/header-component';
import FooterComponent from '../../components/app-layout/footer-component';

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = (isCollapsed: boolean) => {
    setCollapsed(isCollapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSideMenu collapsed={collapsed} onCollapse={handleCollapse} />
      <Layout style={{ marginLeft: collapsed ? '80px' : '250px', transition: 'all 0.2s' }}>
        <HeaderComponent />
        <Content style={{ padding: '16px', minHeight: 'calc(100vh - 64px - 69px)' }}>
          {children}
        </Content>
        <FooterComponent />
      </Layout>
    </Layout>
  );
};

export default AuthenticatedLayout;