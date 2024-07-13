import React from "react";
import {
  LineChartOutlined,
  AlignCenterOutlined,
  UserOutlined,
  BookOutlined,
  LogoutOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, message, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  AUTHENTICATED_ROUTES,
  UNAUTHENTICATED_ROUTES,
} from "../../../utils/constant";
import { AuthServices } from "../../../utils/authService";
const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: 1,
    icon: <LineChartOutlined />,
    label: <Link to={AUTHENTICATED_ROUTES.DASHBOARD}>Dashboard</Link>,
  },
  {
    key: 2,
    icon: <AlignCenterOutlined />,
    label: <Link to={AUTHENTICATED_ROUTES.CATEGORIES}>Categories</Link>,
  },
  {
    key: 3,
    icon: <UserOutlined />,
    label: <Link to={AUTHENTICATED_ROUTES.USERS}>Users</Link>,
  },
  {
    key: 4,
    icon: <BookOutlined />,
    label: <Link to={AUTHENTICATED_ROUTES.POSTS}>Posts</Link>,
  },
  {
    key: 5,
    icon: <CommentOutlined />,
    label: <Link to={AUTHENTICATED_ROUTES.COMMENTS}>Comments</Link>,
  },
  {
    key: 6,
    icon: <LogoutOutlined />,
    label: (
      <div
        onClick={() => {
          AuthServices.removeToken();
          message.success("User is logout succesfuly");
          setTimeout(() => {
            window.location.href = UNAUTHENTICATED_ROUTES.LOGIN;
          }, 1000);
        }}
      >
        Logout
      </div>
    ),
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" style={{ marginTop: "42px" }} />
        <div style={{ marginLeft: "30px", marginBottom: "20px" }}>
          <Button
            type="primary"
            style={{ width: "80%" }}
            onClick={() => navigate(UNAUTHENTICATED_ROUTES.HOME)}
          >
            Home
          </Button>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 482,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflowX: "auto",
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
