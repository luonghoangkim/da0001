import { Link, useRouter, usePathname } from "@/i18n/routing";
import { Menu, Layout, Avatar, Tooltip } from "antd";
import {
  DashboardOutlined,
  WalletOutlined,
  SwapOutlined,
  SettingOutlined,
  LogoutOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import React from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const { Sider } = Layout;

function AppSideMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("MenuApp");

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

  const handleLogout = () => {
    toast.success(t("logoutSuccess"));
    router.push("/login");
  };

  const logoutMenuItem = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <div>{t("logOut")}</div>,
      onClick: handleLogout,
    },
  ];

  return (
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
          <Avatar src="https://img4.thuthuatphanmem.vn/uploads/2020/12/25/anh-avt-anime-doc_115939861.jpg" />
          <div style={{ marginLeft: "8px", color: "white" }}>
            <div>hoangkimluong</div>
            <Tooltip title="View profile">
              <a style={{ color: "rgba(255,255,255,0.65)" }}>View profile</a>
            </Tooltip>
          </div>
        </div>
      </div>
    </Sider>
  );
}

export default AppSideMenu;
