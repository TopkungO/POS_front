import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, Space, Avatar } from "antd";
import type { MenuProps } from 'antd';
import {
    HomeOutlined,
    ShopOutlined
} from "@ant-design/icons";

// Router
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store/store';



import { currentUser, logout } from '../function/auth';
import { LOGOUT } from '../../store/userSlice';


const Navbar = () => {
    const { persistedReducer } = useAppSelector((state: any) => ({ ...state }))
    const tokenST = localStorage.getItem("token")

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (tokenST) {
            currentUser(tokenST).then(res => {
                console.log(res);

            }).catch(err => {
                console.log(err);

                const payload = {
                    username: "",
                    role: [],
                    token: ""
                }
                dispatch(LOGOUT(payload))
                localStorage.clear()

                navigate("/")

            })
        }
    }, [])


    const handleClickLogout = () => {

        const user = {
            username: persistedReducer.user.username,
        }

        logout(user)
            .then(res => {
                console.log(res);
                const payload = {
                    username: "",
                    role: [],
                    token: ""
                }
                dispatch(LOGOUT(payload))
                localStorage.clear()

                navigate("/")
            }).catch(err => {
                console.log(err);
            })
    }

    const items: MenuProps['items'] = [
        {
            label: <Link to="/">home</Link>,
            key: '0',
        },
        {
            label: <Link to="/dashboard">dashboard</Link>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: <div onClick={handleClickLogout}><Link to="">logout</Link></div>,
            key: '2',
        },


    ];

    const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
    const item = ColorList[Math.floor(Math.random() * ColorList.length)];

    if (persistedReducer.user.username && persistedReducer.user.username !== "") {
        return (
            <Dropdown menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <Avatar style={{ backgroundColor: item, verticalAlign: 'middle' }} size="large">
                            {persistedReducer.user.username}
                        </Avatar>
                    </Space>
                </a>
            </Dropdown>
        )
    } else {
        return (
            <Menu mode="horizontal" style={{ background: "none", color: "white" }}>
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="login" icon={<ShopOutlined />}>
                    <Link to="/login">login</Link>
                </Menu.Item>
            </Menu>

        )
    }
};

export default Navbar;
