import {React, Component} from 'react'
import { connect } from "react-redux";
import { Statistic, Card, Divider } from 'antd';
import { ArrowUpOutlined, RiseOutlined, ArrowDownOutlined, CoffeeOutlined } from '@ant-design/icons';
import productAsync from '../../../redux/actions/product'
import './index.css'

class Index  extends Component {

    componentDidMount(){   
        this.props.dispatch(productAsync())
    }
    
    render(){
        return (
            <div>
                <h1>数据汇总</h1>
                <Divider orientation="left" />
                <div className="site-statistic-demo-card">                    
                        <Card title="新增用户" style={{width:'30%'}}>
                            <Statistic
                                title="新增用户(假的)"
                                value={80}
                                
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}                           
                            />
                        </Card>                    
                        <Card title="总用户" style={{width:'30%'}}>
                            <Statistic
                                title="总用户(假的)"
                                value={840}                          
                                valueStyle={{ color: 'skyblue' }}
                                prefix={<RiseOutlined />}                               
                            />
                        </Card>                   
                        <Card title="今日订单" style={{width:'30%'}}>
                            <Statistic
                                title="今日订单(假的)"
                                value={6}                          
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}                                
                            />
                        </Card>                   
                </div>
                <h1>其他统计</h1>
                <Divider orientation="left" />
                <div className="site-statistic-demo-card">
                <Card title="商品种类" style={{width:'30%'}}>
                    <Statistic
                        title="商品种类(真的)"
                        value={this.props.count}                          
                        valueStyle={{ color: 'brown' }}
                        prefix={<CoffeeOutlined />}                                
                    />
                </Card>
                </div>
            </div>
        )
    }
}

export default connect(state => ({ count: state.product.length}))(Index)

