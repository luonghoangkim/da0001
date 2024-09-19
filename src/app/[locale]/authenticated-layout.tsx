import { ReactNode } from 'react';
import AppSideMenu from '../../components/app-layout/app-side-menu';
import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer } from 'antd/es/layout/layout';
import HeaderComponent from '../../components/app-layout/header-component';
import FooterComponent from '../../components/app-layout/footer-component';

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  return (
    <Layout>
      <Sider
        theme="light"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          borderRight: "1px solid #f1f1f1",
          height: "calc(100vh)",
        }}
      >
        <AppSideMenu />
      </Sider>
      <Layout style={{ marginLeft: "250px" }}>
        <HeaderComponent />
        <Content style={{ padding: "16px", minHeight: "calc(100vh" }}>
          {children}
        </Content>
        <FooterComponent />
      </Layout>
    </Layout>
  );
};

export default AuthenticatedLayout;