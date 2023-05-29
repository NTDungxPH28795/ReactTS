import { Layout, Menu } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom'
const { Header } = Layout;
const HeaderHome = () => {
    return (
        <div>
            <Header style={{ backgroundColor: 'white' }}>
                <div className="logo" />
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['home']} style={{ float: 'right' }}>
                    <Menu.Item key="home">
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="product">
                        <Link to="/products">Product</Link>
                    </Menu.Item>
                    <Menu.SubMenu key="account" title="Account">
                        <Menu.Item key="signin">
                            <Link to="/signin">Signin</Link>
                        </Menu.Item>
                        <Menu.Item key="signup">
                            <Link to="/signup">Signup</Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Header>
        </div>
    )
}

export default HeaderHome