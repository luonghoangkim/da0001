import { Link, useRouter, usePathname } from "@/i18n/routing";
import { Menu, Layout, Avatar, Tooltip, Modal } from "antd";
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

function AppSideMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const t = useTranslations("MenuApp");

  const fetchUserFromToken = () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedToken = jwt.decode(token) as JwtPayload | null;
        if (decodedToken && typeof decodedToken !== 'string') {
          const { username, isAdmin } = decodedToken as { username: string, isAdmin: boolean };

          setUsername(username);
          setIsAdmin(isAdmin || false);
        }
        setUsername(username);
        setIsAdmin(isAdmin || false);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      toast.error('Có lỗi xảy ra khi giải mã token.');
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
      key: "/transaction-category",
      icon: <AppstoreOutlined />,
      label: <Link href="/transaction-category">{t("transactionCategory")}</Link>,
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
      <Sider width={250} theme="dark" style={{ height: "100vh" }}>
        <div style={{ padding: "16px", color: "white" }}>
          <h2 style={{ color: "white" }}>MyFinanceManager</h2>
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
            style={{ display: "flex", alignItems: "center", marginTop: "16px" }}
          >
            <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
            <div style={{ marginLeft: "8px", color: "white" }}>
              <div>{username}</div>
              <Tooltip title="View profile">
                <a style={{ color: "rgba(255,255,255,0.65)" }}>View profile</a>
              </Tooltip>
            </div>
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
