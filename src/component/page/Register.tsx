import React from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

//type
import { register } from '../function/auth';
import { LOGIN } from '../../store/userSlice';
import { useAppDispatch } from '../../store/store';
//antdForm
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};



const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onFinish = async (values: { username: string, password: string, email: string }) => {
    const data = {
      username: values.username,
      password: values.password,
      email: values.email
    }
    
    register(data)
      .then(res => {
        localStorage.setItem("token", res.data)


        const payload = {
          username: res.data.user.username,
          role: res.data.user.role,
          token: res.data.token
        }
        dispatch(LOGIN(payload))
        navigate("/")


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
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}

        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="username"
          rules={[
            {
              required: true,
              message: 'Please input your username',
              min: 3,
              max: 60,
            },
            {
              pattern: new RegExp(/^[a-zA-Z0-9]*$/),
              message: "No Space or Special Characters Allowed"
            }
          ]}

        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
              min: 6,
              max: 60,
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" className='mr-5 bg-blue' htmlType="submit">
            Register
          </Button>
          <Button type="primary" className='mr-5 bg-blue'>
            <Link to="/login">Back</Link>
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register