import React, {Component} from 'react'
import { withRouter } from "react-router-dom";
import { Layout, Menu, Dropdown, Avatar, message,Badge } from 'antd';
import {DownOutlined} from '@ant-design/icons';
import logo from './logo.png'
import { connect } from "react-redux";
import {adminRoutes} from '../../routes'
import {getToken, clearToken} from '../../utils/auth'
import './frame.css'

const { Header, Content, Sider } = Layout;

const routes = adminRoutes.filter(route=>route.isShow);

class Index extends Component {

     popMenu = (
        <Menu onClick={ (p)=>{
            if (p.key === 'logOut') {
                clearToken()
                this.props.history.push('/login')
            } else if (p.key === 'noti') {
                this.props.history.push('/admin/notices')
            }
             else message.info(p.key)
        }}>
            <Menu.Item key='noti'>通知中心</Menu.Item>
            <Menu.Item key='setting'>设置</Menu.Item>
            <Menu.Item key='logOut' >退出</Menu.Item>
        </Menu>
    )

    render(){
        //console.log(this.props)
    return (
        <Layout>
            <Header className="header">
            <div className="logo" >
                <img src={logo} alt='logo' height='61px'/>
            </div>
            <Dropdown overlay={this.popMenu}>
                <div>
                    <Avatar style={{backgroundColor:'skyblue'}}>{getToken().slice(-1)}</Avatar>
                    <Badge dot={!this.props.isAllRead}><span style={{color:'white'}}>{getToken()}</span></Badge>
                    <DownOutlined style={{color:'white'}}/>
                </div>
            </Dropdown>
            </Header>
            <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        routes.map(route=>{
                            return (
                                <Menu.Item key={route.path} onClick={p=>{this.props.history.push(p.key)}}>
                                    <route.icon />
                                    {route.title}
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </Sider>
            <Layout style={{ padding: '16px' }}>
                <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
                >
                    {this.props.children}
                </Content>
            </Layout>
            </Layout>
  </Layout>
    )
   }
}

export default connect(state => state.notice)(withRouter(Index))
