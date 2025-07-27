import "./App.css";
import { Breadcrumb, Menu, Layout, ConfigProvider } from "antd";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import { HomePage } from "./Pages/Home";
import { AboutPage } from "./Pages/About";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { CityPage } from "./Pages/City";

const { Content, Footer } = Layout;

// 主应用组件
function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const menus = [
    {
      key: "home",
      label: "Home",
    },
    {
      key: "city",
      label: "City",
    },
    {
      key: "about",
      label: "About",
    },
  ];

  // 根据当前路径获取选中的菜单项
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === "/" || path === "/home") {
      return "home";
    }
    if (path === "/city") {
      return "city";
    }
    if (path === "/about") {
      return "about";
    }
    return "home";
  };

  const getBreadcrumbItems = () => {
    if (location.pathname === "/home" || location.pathname === "/") {
      return [{ title: "Dashboard" }];
    }
    if (location.pathname === "/city") {
      return [{ title: "City" }];
    }
    if (location.pathname === "/about") {
      return [{ title: "About" }];
    }
    return [{ title: "Home" }];
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg: "#fff",
            triggerBg: "#fff",
            triggerColor: "#000",
          },
        },
      }}
    >
      <Layout className="layout" hasSider>
        <Sider
          width={200}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            selectedKeys={[getSelectedKey()]}
            mode="inline"
            items={menus}
            onClick={(e) => {
              navigate(`/${e.key}`);
            }}
          />
        </Sider>
        <Layout>
          <Content className="content">
            <Breadcrumb className="breadcrumb" items={getBreadcrumbItems()} />
            <div className="content-container">
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ©{new Date().getFullYear()} Created by yl
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <Navigate to="/home" /> },
        { path: "home", element: <HomePage /> },
        { path: "about", element: <AboutPage /> },
        { path: "city", element: <CityPage /> },
      ],
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "/city",
      element: <CityPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
