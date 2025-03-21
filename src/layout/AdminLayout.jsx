import { useState, useEffect } from "react";
import {
  BranchesOutlined,
  CheckCircleOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PayCircleOutlined,
  TransactionOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { logout } from "../redux/Features/Auth/authSlice";
import "./style.css";
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [dVisible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle log out
  const handleLogOut = () => {
    toast.warning("logout", { duration: 3000 });
    dispatch(logout());
    navigate("/login");
  };

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/admin",
    },
    {
      key: "2",
      icon: <UsergroupAddOutlined />,
      label: "Manage User",
      path: "/admin/manageUser",
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: "Agent Request",
      path: "/admin/agentRequest",
    },
    {
      key: "4",
      icon: <CheckCircleOutlined />,
      label: "Verified Agent",
      path: "/admin/verifyAgent",
    },
    {
      key: "5",
      icon: <PayCircleOutlined />,
      label: "Recharge Request",
      path: "/admin/cashInRequest",
    },
    {
      key: "6",
      icon: <CreditCardOutlined />,
      label: "Add Money To Agent",
      path: "/admin/addMoney",
    },
    {
      key: "7",
      icon: <TransactionOutlined />,
      label: "All Transaction",
      path: "/admin/allTransaction",
    },
    {
      key: "8",
      icon: <BranchesOutlined />,
      label: "Manage Agent",
      path: "/admin/manageAgent",
    },
    {
      key: "9",
      icon: <WalletOutlined />,
      label: "WithDraw Request",
      path: "/admin/withDrawRequest",
    },
  ];

  const renderMenu = () => (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      onClick={(e) => {
        const selectedItem = menuItems.find((item) => item.key === e.key);
        if (selectedItem) {
          navigate(selectedItem.path);
          setVisible(false);
        }
      }}
      items={menuItems.map(({ key, icon, label }) => ({
        key,
        icon,
        label,
      }))}
    />
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout>
      {/* large screens */}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        collapsed={collapsed}
        onBreakpoint={(broken) => setCollapsed(broken)}
        className="h-screen sticky top-0 hidden lg:block hover:text-white"
      >
        <div className="demo-logo-vertical overflow-hidden" />
        <a
          href="/admin"
          className="font-bold text-2xl cursor-pointer text-white flex justify-center items-center pt-4 pb-3"
        >
          <span className="text-[#12bcff]">Finance</span>
          Flow
        </a>
        {renderMenu()}
      </Sider>

      {/* moblie screen */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 z-50 transition-transform transform ${
          dVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <a href="/" className="font-bold text-2xl cursor-pointer text-white">
            <span className="text-[#14bcff] ">Finance</span>
            Flow
          </a>
          <button
            className="text-white text-2xl"
            onClick={() => setVisible(false)}
          >
            ×
          </button>
        </div>
        <div className="bg-gray-900 p-4">{renderMenu()}</div>
      </div>

      <Layout>
        <Header
          style={{ padding: 0 }}
          className="sticky top-0 bg-[#001529] z-20 flex items-center justify-between"
        >
          {/* sidebar icon*/}
          {!isMobile && (
            <Button
              className="text-white icon-btn"
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          )}

          {/* small screen */}
          {isMobile && (
            <Button
              className="text-white icon-btn"
              type="text"
              icon={<MenuUnfoldOutlined />}
              onClick={() => setVisible(true)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          )}

          <span className="mr-5">
            <Button
              color="primary"
              className="font-semibold"
              onClick={handleLogOut}
            >
              Log Out
            </Button>
          </span>
        </Header>
        <Content
          className="bg-cover bg-no-repeat"
          //   style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="bg-[#ffffff] h-full p-5">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
