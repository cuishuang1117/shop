import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { setToken } from "../../utils/auth";
import './login.css'

export default class FindPwd extends Component {

    handleSubmit = (event)=>{
        let name = event.target[0].value
        let pwd = event.target[1].value
        let pwdConfirm = event.target[2].value
        if (pwd !== pwdConfirm)
            return ;
        axios.post('/api/findpwd', {name, pwd}).then(
            response => {
                if (response.data.code) {
                    message.success('重置密码成功')
                    setToken(name)
                    this.props.history.push('/admin')
                } else {
                    message.error('该用户名不存在')
                }
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
                    placeholder="请输入新密码"
                    />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    rules={[{ required: true, message: '密码不能为空!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('两次输入密码不一致!');
                                },
                            })                   
                    ]}>
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="请再次输入新密码"
                    />
                </Form.Item>
                <Form.Item>
                    <Button style={{width:'200px',marginBottom:'20px'}} type="primary" htmlType="submit" className="login-form-button">
                    重置密码
                    </Button><br/>
                    <Link to="/login" style={{marginLeft:'50px'}} >登录</Link>
                    <Link to="/register" style={{marginLeft:'40px'}} >注册</Link>
                    
                </Form.Item>
                </Form>                  
            
            </div>
        )
    }
}
