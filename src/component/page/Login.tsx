import React from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
//type
import { loginType } from '../../types';

//function
import { login } from '../function/auth';
import { isAdmin } from '../helpers/authHelpers';
import { LOGIN } from '../../store/userSlice';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()


    const onFinish = async (values: loginType) => {

        login(values).then(res => {
            console.log(res)
            const payload = {
                username: res.data.user.username,
                role: res.data.user.role,
                token: res.data.token
            }
            dispatch(LOGIN(payload))
            localStorage.setItem("token", res.data.token)

            if (isAdmin(res.data.user)) {
                navigate("/admin")
            } else {
                navigate("/dashboard")
            }

        }).catch(err => {
            console.log(err);
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='container my-12 m-auto'>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button htmlType="submit" className="mr-5">
                        Submit
                    </Button>
                    <Button className='underline'>
                        <Link to="/register">register</Link>
                    </Button>
                </Form.Item>
            </Form>
        </div>

    )
}

export default Login