import { Link, useRouter, usePathname } from "@/i18n/routing";
import { Menu, Layout, Modal } from "antd";
import {
  DashboardOutlined,
  SwapOutlined,
  SettingOutlined,
  LogoutOutlined,
  CreditCardOutlined,
  DollarOutlined,
  AppstoreOutlined,
  UserOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const { Sider } = Layout;
interface AppSideMenuProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

function AppSideMenu({ collapsed, onCollapse }: AppSideMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const t = useTranslations("MenuApp");

  const fetchUserFromToken = () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedToken = jwt.decode(token) as JwtPayload | null;
        if (decodedToken && typeof decodedToken !== 'string') {
          setIsAdmin(decodedToken.isAdmin || false);
        }
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  useEffect(() => {
    fetchUserFromToken();
  }, []);

  const userMenuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">DashBoard</Link>,
    },
    {
      key: "/transaction",
      icon: <SwapOutlined />,
      label: <Link href="/transaction">{t("transaction")}</Link>,
    },
    {
      key: "/credit-card",
      icon: <CreditCardOutlined />,
      label: <Link href="/credit-card">{t("creditCard")}</Link>,
    },
    {
      key: "/goals",
      icon: <DollarOutlined />,
      label: <Link href="/goals">{t("goats")}</Link>,
    },
    {
      key: "/transaction-categories",
      icon: <AppstoreOutlined />,
      label: <Link href="/transaction-categories">{t("categoriesManagement")}</Link>,
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: <Link href="/settings">{t("setting")}</Link>,
    },
  ];

  const adminMenuItems = [
    {
      key: "/manage-users",
      icon: <UserOutlined />,
      label: <Link href="/manage-users">{t("manageUsers")}</Link>,
    },
    {
      key: "/backup",
      icon: <DatabaseOutlined />,
      label: <Link href="/backup">{t("backup")}</Link>,
    },
  ];

  const menuItems = isAdmin ? [...userMenuItems, ...adminMenuItems] : userMenuItems;

  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    toast.success(t("logoutSuccess"));
    router.push("/login");
  };

  const logoutMenuItem = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: t("logOut"),
      onClick: showLogoutModal,
    },
  ];

  return (
    <>
      <Sider
        width={250}
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          position: "fixed",
          height: "100vh",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ padding: "16px", color: "white", textAlign: "center" }}>
          {collapsed ? <h2>MFM</h2> : <h2>MyFinanceManager</h2>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          selectedKeys={[pathname]}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: "16px",
          }}
        >
          <Menu theme="dark" mode="inline" items={logoutMenuItem} />
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "16px", marginBottom: "40px" }}
          >
          </div>
        </div>
      </Sider>
      <Modal
        title={t("logOut")}
        open={isLogoutModalVisible}
        onOk={handleLogout}
        onCancel={() => setIsLogoutModalVisible(false)}
        okText={t("yes")}
        cancelText={t("cancel")}
      >
        <p>{t("logoutConfirmationMessage")}</p>
      </Modal>
    </>
  );
}

export default AppSideMenu;