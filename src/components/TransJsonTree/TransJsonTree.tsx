import React, { Component } from 'react';
import {Button,Input } from 'antd';
import {transToTree,syntaxHighlight} from '../../Libs/tools'
import ReactJson from 'react-json-view'
import './TransJsonTree.scss'
const { TextArea } = Input;
interface Props {}
interface State {
  listData:string
  resData:any
}

class TransJsonTree extends React.Component<Props,State>{
  public readonly state:Readonly<State> = {
    listData:'[{"title":"一级目录1","key":"0","parentKey":""},{"title":"一级目录1-1","key":"4","parentKey":"0"},{"title":"一级目录1-2","key":"5","parentKey":"0"},{"title":"一级目录1-3","key":"6","parentKey":"5"},{"title":"123213","key":"7","parentKey":"5"}]',
    resData:null
  }
  componentDidUpdate = ()=>{
    
  }
  static defaultProps:Props = {}
  handleClick = ()=>{
    if(this.state.listData !== ''){
      let res = transToTree(this.state.listData,'key','parentKey');
      this.setState({
        resData:res
      })
    } 
  }
  textChange = (e:any)=>{
    console.log(e.target.value)
    this.setState({
      listData:e.target.value
    })
  }
  render(){
    return  <div className = "Trans-wrapper" id = "TransJsonTreeComponent">
          <div className = "Left-tree">
            <TextArea placeholder="Please Input Your Data" 
            autosize={{ minRows: 10, maxRows: 15 }} 
            onChange = {this.textChange} 
            value = {typeof this.state.listData === 'string' ? this.state.listData : JSON.stringify(this.state.listData)}/>
          </div>
          <div className = "Middle">
            <Button type = "primary" onClick = {this.handleClick}>转换>></Button>
          </div>
          <div className="List-data">
           <ReactJson src = {this.state.resData}/>
          </div>
        </div> 
  }
}

export default TransJsonTree