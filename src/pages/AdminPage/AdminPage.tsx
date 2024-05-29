import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  IdcardOutlined,
  FileAddOutlined,
  ApartmentOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import styles from './AdminPage.module.scss';

const { Header, Sider, Content } = Layout;

const links = [
  {
    key: '/admin/cities',
    icon: <FileAddOutlined />,
    label: <Link to="/admin/cities"> Добавить город </Link>,
  },
  {
    key: '/admin/countries',
    icon: <ApartmentOutlined />,
    label: <Link to="/admin/countries"> Добавить страну </Link>,
  },
  {
    key: '/admin/users',
    icon: <IdcardOutlined />,
    label: <Link to="/admin/users"> Пользователи </Link>,
  },
  {
    key: '/',
    icon: <LeftOutlined />,
    label: <Link to="/"> Назад</Link>,
  },
];
const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu className={styles.menu} theme="dark" mode="inline" selectedKeys={[location.pathname]} items={links} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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

export default AdminPage;
