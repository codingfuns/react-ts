import React, { Component } from 'react';
import { Tree, Button, Tag } from 'antd';
import './TransTree.scss'

interface Trees{
  title:string,
  key:string,
  parentKey:string,
  children:Array<Trees>
}
interface Props {
  treeData:Array<Trees>,
  onSubmit:any;
}
interface State {
  checkedNode:any
}
const { TreeNode } = Tree;

class TransTree extends React.Component<Props,State>{
  public readonly state:Readonly<State> = {
    checkedNode:[],
  }
  componentDidUpdate = ()=>{
    
  }
  static defaultProps:Props = {
    onSubmit:null,
    treeData:[
      { title: '一级目录1', 
        key: '0',
        parentKey:'',
        children:[
          { 
            title: '一级目录1-1', 
            key: '4',
            parentKey:'0',
            children:[]
          },{ 
            title: '一级目录1-2', 
            key: '5' ,
            parentKey:'0',
            children:[{ 
              title: '一级目录1-3', 
              key: '6' ,
              parentKey:'5',
              children:[]
            },
            { 
              title:'123213', 
              key: '7' ,
              parentKey:'5',
              children:[]
            }]
          }
        ]}
    ]
  }
  fromateTreeNode= (data:any)=>data.map((item:any)=>{
      if (item.children) {
        return (
          <TreeNode {...item}>
            {this.fromateTreeNode(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
  })
  
  getCheckedNode = (checkedKeys:any, e:any)=>{
    let parentNode = [];
    let leafNode = []
    if(checkedKeys.length === 0){
      this.setState({
        checkedNode:[]
      });
      return;
    }
    if(e.halfCheckedKeys.length === 0){
      this.setState({
        checkedNode:this.props.treeData
      })
    }else{
      for(let halfKey of e.halfCheckedKeys){
        for(let checkedItem of e.checkedNodes){
          if(halfKey === checkedItem.props.parentKey && checkedItem.props.children.length !== 0){
            parentNode.push(checkedItem);
          }else if(halfKey === checkedItem.props.parentKey && checkedItem.props.children.length == 0){
            leafNode.push(checkedItem);
          }
        }
      }
      this.setState({
        checkedNode:parentNode.concat(leafNode)
      })
    }
  }
  submitCheckedData = ()=>{
    this.props.onSubmit(this.state.checkedNode.slice(0));
  }
  render(){
    return  <div className = "Trans-wrapper" id = "TranferTreeComponent">
          <div className = "Left-tree">
            <Tree checkable onCheck = {this.getCheckedNode}>
              {this.fromateTreeNode(this.props.treeData)}
            </Tree>
          </div>
          <div className="List-data">
          <ul>
            {this.state.checkedNode.map((item:any)=>{
              return <li key = {item.key}>
                <Tag color = "cyan">{item.title || item.props.title}</Tag>
              </li>
            })
            }
          </ul>
            {this.state.checkedNode.length === 0 ? '':<Button type = "primary" onClick ={this.submitCheckedData}>提交</Button>}  
          </div>
        </div> 
  }
}

export default TransTree