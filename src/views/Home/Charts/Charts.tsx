import React, { Component } from 'react';
import {CharPie,CharBar,StackChart} from '../../../components/Charts/index'
import CardInfo from '../../../components/Cards/CardInfo'
import { Row, Col,Card } from 'antd';

import './Charts.scss'
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';
interface Props{}
interface State{
  pieData:Array<any>,
  CardData:Array<any>,
  barData:any
}

class Charts extends React.Component<Props,State>{
  public readonly state:Readonly<State> = {
    pieData:[
      {value: 335, name: '直接访问'},
      {value: 310, name: '邮件营销'},
      {value: 234, name: '联盟广告'},
      {value: 135, name: '视频广告'},
      {value: 1548, name: '搜索引擎'}
    ],
    CardData:[{
      type:'usergroup-add',
      color:'#b388ff',
      text:'253',
      subText:'新增用户'
    },{
      type:'eye',
      color:'#03a9f4',
      text:'253',
      subText:'累计查看'
    },{
      type:'like',
      color:'#e040fb',
      text:'125',
      subText:'点赞数量'
    },{
      type:'fork',
      color:'#00bcd4',
      text:'36',
      subText:'分享统计'
    },{
      type:'phone',
      color:'#26a69a',
      text:'46',
      subText:'电话咨询'
    },{
      type:'import',
      color:'#ff9800',
      text:'15',
      subText:'新增页面'
    }],
    barData: {
      Mon: 13253,
      Tue: 34235,
      Wed: 26321,
      Thu: 12340,
      Fri: 24643,
      Sat: 1322,
      Sun: 1324
    }
  }
  render(){
    return <div className = "Charts-page">
      <Row gutter={16} className = "CardInfo"> 
        {this.state.CardData.map((item:any,index:number)=>{
          return <Col xs = {12} md = {8} lg = {4}  key = {index} >
            <CardInfo type = {item.type} text = {item.text} subText  ={item.subText} background = {item.color}></CardInfo>
            </Col>
        })}
      </Row>
      <Row gutter={16} className = "CardInfo">
        <Col xs = {24} lg = {8}>
          <Card bordered hoverable>
            <CharPie value = {this.state.pieData} text="每周用户活跃量" subtext = ""></CharPie>
          </Card>  
        </Col>
        <Col xs = {24} lg = {16}>
          <Card bordered hoverable>
            <CharBar value = {this.state.barData} text="用户访问来源" subtext = "" style = {{height:300,with:'100%'}}></CharBar>
          </Card>
        </Col>
      </Row>
      <Row className = "CardInfo">
      <Col xs = {24} lg = {24}>
          <Card bordered hoverable>
            <StackChart style = {{height:300,with:'100%'}}></StackChart>
          </Card>
        </Col>
      </Row>
      
      
      </div>
  }
}
export default Charts