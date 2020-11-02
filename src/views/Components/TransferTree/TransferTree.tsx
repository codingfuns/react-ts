import React, { Component } from 'react';
import {Card,Row, Col } from 'antd';
import TransTree from '../../../components/Transtree/TransTree'
import TransJsonTree from '../../../components/TransJsonTree/TransJsonTree'
import './TransferTree.scss'

interface Props {
  treeData:Array<any>
}

interface State {}

class TransferTree extends React.Component<Props,State>{
  public readonly state:Readonly<State> = {

  }
  static defaultProps = {
    treeData:[
      { title: 'Expand to load', key: '0' ,children:[{ title: 'Expand 22to load', key: '4' }]},
      { title: 'Expand to load', key: '1' },
    ]
  }
  getCheckedData=(data:any)=>{
    console.log(data)
  }
  render(){
    return  <div>
    <Row  gutter={16} className = "CardInfo">
      <Col xs = {24} lg = {8}>
          <Card bordered hoverable>
            <TransTree onSubmit = {this.getCheckedData}></TransTree>
          </Card>  
        </Col>
    </Row>
    <Row gutter={16} className = "CardInfo">
      <Col xs = {24} md = {24} lg = {24}>
        <h1>Json字符串数组转换为树状结构</h1>
        <Card bordered hoverable>
        <TransJsonTree></TransJsonTree>
        </Card>  
      </Col>
    </Row>
      </div>

  
  }
}

export default TransferTree