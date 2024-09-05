import { ReactNode } from 'react';
import AppSideMenu from './components/app-side-menu';
import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';

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
        <Content style={{ padding: "16px", minHeight: "calc(100vh" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AuthenticatedLayout;