
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
    DesktopOutlined,
    DoubleRightOutlined,
    FileOutlined,
    HomeOutlined,
    PieChartOutlined,
    SmileTwoTone,
    TeamOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import FooterHome from '../Outlet/Component/Footer';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const AdminPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const handleSignOut = () => {
        localStorage.clear();
        navigate('/');
    };
    const navigate = useNavigate();

    const menuList: MenuItem[] = [
        {
            id: 1,
            name: 'Home',
            icon: <HomeOutlined />,
            path: '/',
        },
        {
            id: 2,
            name: 'Dashboard',
            icon: <SmileTwoTone />,
            path: '/admin',
        },
        {
            id: 3,
            name: 'Product',
            icon: <PieChartOutlined />,
            path: '/admin/products',
        },
        {
            id: 4,
            name: 'User',
            icon: <TeamOutlined />,
            path: '/admin/users',
        },
        {
            id: 5,
            name: 'Category',
            icon: <UnorderedListOutlined />,
            path: '/admin/categories',
            // onClick: handleSignOut,
        },
        {
            id: 6,
            name: 'Sign Out',
            icon: <DoubleRightOutlined />,
            path: '/',
            onClick: handleSignOut,
        },
    ];

    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        {menuList.map(item => (
                            <Menu.Item key={item.id} icon={item.icon} onClick={item.onClick}>
                                <Link to={item.path}>{item.name}</Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Content style={{ margin: '0 16px' }}>
                        <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                            <Outlet />
                        </div>
                    </Content>
                    <FooterHome />
                </Layout>
            </Layout>
        </div>
    );
};

export default AdminPage;
