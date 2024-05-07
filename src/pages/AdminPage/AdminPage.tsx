import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
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

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const links = [
    {
      key: '1',
      icon: <FileAddOutlined />,
      label: <NavLink to="/admin"> Добавить город </NavLink>,
    },
    {
      key: '2',
      icon: <ApartmentOutlined />,
      label: <NavLink to="addTour"> Добавить страну </NavLink>,
    },
    {
      key: '3',
      icon: <IdcardOutlined />,
      label: <NavLink to="users"> Пользователи </NavLink>,
    },
    {
      key: '4',
      icon: <LeftOutlined />,
      label: <NavLink to="/"> Назад</NavLink>,
    },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu className={styles.menu} theme="dark" mode="inline" defaultSelectedKeys={['1']} items={links} />
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
