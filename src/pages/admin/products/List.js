import React, { Component } from 'react'
import { connect } from "react-redux";
import  axios  from "axios";
import { Card, Table, Button, Popconfirm, message } from "antd";
import productAsync from '../../../redux/actions/product';

class List extends Component {

    updateItem = (record) => {
        this.props.history.push({
            pathname:'/admin/products/edit',
            state : {name : record.name, price : record.price, id : record.id}
        })
    }

    modifyItem = (record) => {
        axios.post('/api/admin/products/modify', {id: record.id}
        ).then(
            ()=>{ this.props.dispatch(productAsync()) }
        )
    }

    deleteItem = (id)=>{
        axios.post('/api/admin/products/delete', {id}).then(
            response => {message.success('删除成功！');this.props.dispatch(productAsync())},
            err => {console.log(err)}
        )
        
    }

    columns = [
        {
            title: '序号',
            key: 'id',
            width: 80,
            align: 'center',
            render: (txt, record, index) => index+1           
        },{
            title: '名字',
            dataIndex: 'name'
        },{
            title: '价格/元',
            dataIndex: 'price'
        },{
            title: '是否在售',
            dataIndex: 'onSale',
            render: (txt, record) => record.onSale ? '在售' : '已下架'
        },{
            title: '操作',
            render: (txt, record)=>{
                return (
                    <div>
                        <Button size='small' type='primary' onClick={()=>{this.updateItem(record)}}>修改</Button>
                         <Popconfirm title='确定删除此项？' onConfirm={()=>{this.deleteItem(record.id)}} > 
                            <Button size='small' type='danger' style={{margin:'0 1rem'}}>删除</Button>
                        </Popconfirm>
                        <Button size='small'  onClick={()=>{ this.modifyItem(record);console.log(('点击上架下架啦')) }}>{record.onSale ? '下架':'上架'}</Button>                       
                    </div>
                )
            }
        }
    ]

    componentDidMount(){    
        this.props.dispatch(productAsync())
    }

    render(){   

        return (
            <Card title='商品列表' 
                extra={
                <Button type='primary' size='small' onClick={()=>{this.props.history.push('/admin/products/edit')}}>
                    新增
                </Button>}>                  
                <Table  
                       columns={this.columns} 
                       bordered 
                       dataSource={[...this.props.items]} 
                       pagination={{pageSize : 7}}  
                       rowKey={(record) => {
                        return (record.id + Date.now()) //在这里加上一个时间戳就可以了
                      }}
                      rowClassName = { record => record.onSale ? 'onSale':'notOnSale'}                   
                       />
            </Card>
        )
    }
}
export default connect(state => ({items: state.product}))(List)
