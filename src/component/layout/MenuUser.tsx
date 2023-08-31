import React from 'react'

import { AppstoreOutlined,
    DashboardOutlined,
    UserOutlined, 
    BookOutlined,
    DropboxOutlined,
    FileOutlined} from '@ant-design/icons';

import { Menu, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

const MenuUser = () => {

    const { persistedReducer } = useSelector((state: any) => ({ ...state }))

    return (
        <Menu
            style={{ width: 256, height: '100Vh' }}
            mode="inline"
        >
            <Menu.Item key="Dashboard" icon={<DashboardOutlined />}>
                <Link to="/">Dashboard</Link>
            </Menu.Item>
            {/* <Menu.Item key="Stores" icon={<MailOutlined />}>
                <Link to="/stores">Stores</Link>
            </Menu.Item> */}
            <Menu.Item key="User" icon={<UserOutlined />}>
                <Link to="/">User</Link>
            </Menu.Item>
            <Divider type="vertical" />

            <Menu.Item key="Category" icon={<BookOutlined />}>
                <Link to="/">Category</Link>
            </Menu.Item>
            <Menu.Item key="Products" icon={<DropboxOutlined />}>
                <Link to="/">Products</Link>
            </Menu.Item>
            <Menu.Item key="Orders" icon={<DropboxOutlined />}>
                <Link to="/">Orders</Link>
            </Menu.Item>
            <Menu.Item key="reports" icon={<FileOutlined />}>
                <Link to="/">reports</Link>
            </Menu.Item>

        </Menu>
    )
}

export default MenuUser