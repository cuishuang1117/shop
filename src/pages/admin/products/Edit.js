import {React, Component} from 'react'
import axios from 'axios'
import {Form, Card, Input, Button} from "antd";

export default class Edit extends Component{

    state = this.props.location.state
    
    priceValidate = (_, value)=>{
        //console.log('price', value)
        
        if (value && !Number(value))
            return Promise.reject('价格必须是数字且大于0')
        else  if (value * 1 > 100) {
            return Promise.reject('价格不能大于100')
        }
        else if (value * 1 < 0)
            return Promise.reject('价格不能为负')
            return Promise.resolve()
    }

    nameValidate = (_, value) => {
        //console.log('name', value)
        
        if (value.length > 6)
            return Promise.reject('名字不能超过6个字符')
        return Promise.resolve()
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target[0].value
        const price = event.target[1].value * 1
        if (name === '' || price <= 0 || price > 100) 
            return ;
        let formData = { name, price }
        if (this.state) {          
            formData.id = this.state.id
        }       
        axios.post('/api/admin/products', formData).then(
            response => {
                window.alert('保存成功！')              
                window.location.href = '/admin/products'               
            },
            err => {console.log(err)}
        )        
    }
    
    render(){
        return (
            <Card title='商品编辑'>
                <Form onSubmitCapture={this.handleSubmit} >
                    <Form.Item label="名字" 
                                name="name"
                                rules={[{required: true, message: '名字不能为空'}, {validator:this.nameValidate}]}>
                        <Input placeholder='请输入商品名字' defaultValue={this.state ? this.state.name : ''}/>                  
                    </Form.Item>
                    <Form.Item label="价格" name="price"  
                                rules={[{required: true, message: '价格不能为空'},{validator:this.priceValidate}]}>
                        <Input placeholder='请输入商品价格' defaultValue={this.state ? this.state.price : ''}/>                  
                    </Form.Item>
                    <Form.Item>
                        <Button  htmlType="submit" type='primary'>保存</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
