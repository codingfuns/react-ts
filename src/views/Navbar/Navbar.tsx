import React, { Component, Children } from 'react';
import { Menu, Icon, Button } from 'antd';
import {Link} from 'react-router-dom'
import './Navbar.scss'
const SubMenu = Menu.SubMenu;

interface Props{
  onChange:any,
  parentPath:string
}
interface Menus{
  text:string,
  icon:string,
  path:string,
  id:number,
  children:Array<any>
}
interface State{
  collapsed :any,
  menuList:Array<Menus>
}

class Navbar extends Component<Props,State>{
  public readonly state: Readonly<State>={
    collapsed:false,
    menuList:[{
        text:'组件',
        icon: 'pie-chart',
        path:'/compomemts',
        id:1,
        children:[
          {
            text:'树形穿梭框',
            icon: 'pie-chart',
            path:'/compomemts/transtree',
            id:101,
            children:[]
          },{
            text:'数字渐变',
            icon: 'pie-chart',
            path:'/compomemts/count_to_page',
            id:102,
            children:[]
          },{
            text:'拖拽列表',
            icon: 'pie-chart',
            path:'/compomemts/drag_list_page',
            id:103,
            children:[]
          },{
            text:'可拖动抽屉',
            icon: 'pie-chart',
            path:'/compomemts/drag_drawer_page',
            id:104,
            children:[]
          },{
            text:'组织机构树',
            icon: 'pie-chart',
            path:'/compomemts/org_tree_page',
            id:105,
            children:[]
          },{
            text:'图片裁剪',
            icon: 'pie-chart',
            path:'/compomemts/cropper_page',
            id:106,
            children:[]
          },{
            text:'多功能表格',
            icon: 'pie-chart',
            path:'/compomemts/tables_page',
            id:107,
            children:[]
          },{
            text:'Markdown编辑器',
            icon: 'pie-chart',
            path:'/compomemts/markdown_page',
            id:108,
            children:[]
          },{
            text:'富文本编辑器',
            icon: 'pie-chart',
            path:'/compomemts/editor_page',
            id:109,
            children:[]
          }
        ]
      }
    ]
  }
  toggleCollapsed = ()=>{
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  formateMenu = (obj:Menus)=>{
    let cHtml:any;
    let childrenArr = obj.children;
    if("undefined"!=typeof(childrenArr)&&childrenArr.length>0){
      cHtml = childrenArr.map((item:Menus,index:number)=>{
        return this.formateMenu(item);
      });
      return <SubMenu key={obj.path} title={<span><Icon type="mail" /><span>{obj.text}</span></span>}>{cHtml}</SubMenu>
    }else{
      return <Menu.Item key={obj.id}><Icon type="pie-chart" /><span><Link to={`${this.props.parentPath}`+ obj.path}>{obj.text}</Link></span></Menu.Item>
    }
  }
  menuClick = (e:any)=>{
    console.log(e);
    this.props.onChange(e.key);
  }
  render() {
    let html=this.state.menuList.map((obj:Menus,index:number)=> {
      if ("undefined"!=typeof(obj.children)&&obj.children.length>0) {
          return this.formateMenu(obj);
      } else {
          //这里的routeurl是路由地址，是自定义的一个属性
          return <Menu.Item key={obj.id}><Icon type="pie-chart" /><span><Link to={`${this.props.parentPath}`+ obj.path}>{obj.text}</Link></span></Menu.Item>
      }
  });
    return (
        <Menu
          mode="inline"
          theme="dark"
          onClick = {this.menuClick}
        >
          {html}
        </Menu>
    );
  }
}
export default Navbar