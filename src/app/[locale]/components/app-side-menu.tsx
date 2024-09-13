import { Link, useRouter, usePathname } from "@/i18n/routing";
import { Menu, Layout, Avatar, Tooltip, Modal } from "antd";
import {
  DashboardOutlined,
  WalletOutlined,
  SwapOutlined,
  SettingOutlined,
  LogoutOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { getUser } from "../settings/service/setting-service";

const { Sider } = Layout;

function AppSideMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState('');

  const t = useTranslations("MenuApp");
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const response = await getUser();
      const { user } = response;

      setUsername(user.username);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('Có lỗi xảy ra khi lấy thông tin người dùng.');
    } finally {
      console.log("error");
    }
  };

  const menuItems = [
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
      key: "/settings",
      icon: <SettingOutlined />,
      label: <Link href="/settings">Settings</Link>,
    },
  ];

  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };

  const handleLogout = () => {
    // Xóa authToken khỏi localStorage
    localStorage.removeItem('authToken');
    toast.success(t("logoutSuccess"));
    router.push("/login");
  };

  React.useEffect(() => {
    fetchUserProfile();
  }, []);

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