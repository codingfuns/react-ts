import React, { Component } from 'react';
import {Card,Icon} from 'antd'
import './CardInfo.scss'

interface Props {
  type:string,
  background:string,
  text:string,
  subText:string
}
interface State {}

class CardInfo extends React.Component<Props,State>{
  public readonly state:Readonly<State> = {

  }
  static defaultProps:Props = {
    type:'mail',
    background:'red',
    text:'0',
    subText:'text'
  }

  render(){
    return <Card className = "Card-wrap" bordered hoverable>
      <div className = "Card-icon" style = {{background:this.props.background}}>
        <Icon type = {this.props.type} style = {{fontSize:40,color:'white'}}></Icon>
      </div>
      <div className = "Card-des">
        <p style = {{fontSize:40,color:'black'}}>{this.props.text}</p>
        <p style = {{fontSize:12,color:'#303030'}}>{this.props.subText}</p>
      </div>
    </Card>
  }
}   
export default CardInfo