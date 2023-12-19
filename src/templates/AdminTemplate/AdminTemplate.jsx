import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  console.log(location);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          // lấy localtion từ hook useLocation để kiểm tra xem người dùng đang đứng ở component nào để active nút menu
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: '/admin/manager-user',
              icon: <UserOutlined />,
              label: <Link to={'/admin/manager-user'}>Quản lí người dùng</Link>,
            },
            {
              key: '/admin',
              icon: <VideoCameraOutlined />,
              label: <Link to={'/admin'}>Quản lí phim</Link>,
            },
            {
              key: '/admin',
              icon: <VideoCameraOutlined />,
              label: <Link to={'/admin/add-movie'}>Tạo phim</Link>,
            },
            {
              key: '/admin/add-movie',
              icon: <VideoCameraOutlined />,
              label: <Link to={'/admin/add-movie'}>Tạo phim</Link>,
            },
            {
              key: '/admin/manager-order',
              icon: <UploadOutlined />,
              label: (
                <Link to={'/admin/manager-order'}>Quản lí lịch đặt vé</Link>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;