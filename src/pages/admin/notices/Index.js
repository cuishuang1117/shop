import React, { Component } from 'react'
import { Card, List, Typography, Button } from "antd";
import { connect } from "react-redux";

const data = [
    '这是第一条消息。',
    '今天天气不错。',
    '不知道该说什么。',
    '那就祝你新年快乐吧。',
    '祝你心想事成！',
  ];

class Index extends Component {
    render() {
        return (
            <Card title='通知中心' extra={ <Button onClick={
              ()=>{ this.props.dispatch({type: 'READ_ALL'}) } 
              }>全部已读</Button>}>               
                <List
                header={<div>消息列表</div>}
                footer={<div>已经到底了</div>}
                bordered
                dataSource={data}
                renderItem={item => (
                  <List.Item >
                    <Typography.Text mark={!this.props.isAllRead}>[新消息]</Typography.Text> {item}
                  </List.Item>                  
                )}               
                />

            </Card>
        )
    }
}

export default connect(state => state.notice)(Index)
