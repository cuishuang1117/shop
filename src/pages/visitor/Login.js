import React, { Component } from 'react'
import axios from 'axios'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { setToken } from "../../utils/auth";
import './login.css'
import { Link } from 'react-router-dom';

export default class Login extends Component {
    
    handleSubmit = (event)=>{

        event.preventDefault()
        const name = event.target[0].value
        const pwd = event.target[1].value
        axios.post('/api/login/check', {name, pwd}).then(
            response => {
                if (response.data.code) {
                    message.success('登录成功')
                    setToken(name)
                    this.props.history.push('/admin')
                }
                else {
                    message.error('用户名或密码错误，请重试')
                }
            },
            err => {
                console.log(err)
            }
        )
    }

    render() {
        return (
            <div id='loginOrRegister'>
                <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onSubmitCapture={this.handleSubmit} >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '用户名不能为空!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '密码不能为空!' }]}>
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="请输入密码"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox style={{marginRight:'35px'}}>记住密码</Checkbox>
                    </Form.Item>
                    <Link  className="login-form-forgot" to='/findpwd'>
                    找回密码
                    </Link>
                </Form.Item>

                <Form.Item>
                    <Button style={{width:'200px',marginBottom:'20px'}} type="primary" htmlType="submit" className="login-form-button">
                    登录
                    </Button><br/>
                    <Link to="/register" style={{marginLeft:'30px'}} >还没有账户,创建一个</Link>
                </Form.Item>
                </Form>             
            </div>
            
        )
    }
}
