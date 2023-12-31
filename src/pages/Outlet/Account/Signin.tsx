import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from '../../type/users';

interface IProps {
    users: IUser[],
    onSignIn: (email: string, password: string) => void
}

const Signin = (props: IProps) => {
    const navigate = useNavigate()
    const [data, setData] = useState<IUser[]>([])
    useEffect(() => {
        setData(props.users)
    }, [props])
    console.log(data);

    // const currentUser = () => {
    //     const user = localStorage.getItem('user')
    //     if (user) {
    //         return JSON.parse(user)
    //     }
    //     return null
    // }

    const onFinish = (values: any) => {
        const { email, password } = values;
        const foundUser = data.find((user: IUser) => user.email.toLowerCase() === email.toLowerCase() && user.password === password)
        if (foundUser) {
            localStorage.setItem('user', JSON.stringify(foundUser));
            console.log(localStorage.role);
            navigate('/admin');
            notification.success({
                message: 'Success',
                description: 'Sign In Successfully!',
            });
        } else {
            notification.error({
                message: 'Error',
                description: 'Incorrect email or password!',
            });
        }
    };

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 500, margin: '0 auto' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Account Mail"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
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
                    <span>Do not have an account? <Link to={'/signup'}>register</Link></span>
                    <hr />
                    <Button type="primary" htmlType="submit">
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Signin
