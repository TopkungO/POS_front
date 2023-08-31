import React from 'react'

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

import { Menu, Divider } from 'antd';
import { Link } from 'react-router-dom';


const MenuAdmin = () => {

    return (
        <Menu
            style={{ width: 256, height: '100Vh' }}
            mode="inline"
        >
            <Menu.Item key="Dashboard" icon={<MailOutlined />}>
                <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            {/* <Menu.Item key="Stores" icon={<MailOutlined />}>
                <Link to="/stores">Stores</Link>
            </Menu.Item> */}
            <Menu.Item key="User" icon={<MailOutlined />}>
                <Link to="/user">User</Link>
            </Menu.Item>
            <Divider type="vertical" />

            <Menu.Item key="Category" icon={<MailOutlined />}>
                <Link to="/category">Category</Link>
            </Menu.Item>
            <Menu.Item key="Products" icon={<MailOutlined />}>
                <Link to="/products">Products</Link>
            </Menu.Item>
            <Menu.Item key="Orders" icon={<MailOutlined />}>
                <Link to="/orders">Orders</Link>
            </Menu.Item>
            <Menu.Item key="reports" icon={<MailOutlined />}>
                <Link to="/reports">reports</Link>
            </Menu.Item>

        </Menu>
    );

}

export default MenuAdmin