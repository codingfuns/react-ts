import React, { Component } from 'react';
import { Menu, Icon, Button, Avatar } from 'antd';
import { BrowserRouter , Route, Switch,RouteComponentProps } from 'react-router-dom';
import { connect } from "react-redux";
import Navbar from '../Navbar/Navbar'
import { Layout } from 'antd';
import ChartsView from './Charts/Charts'
import TransferTree from '../Components/TransferTree/TransferTree'
import store from '../../redux/store';

import logo from '../../logo.svg';
import './Home.scss';
interface Props extends RouteComponentProps { }
interface Props{
  userInfo ?: any
}
interface State{
  collapsed:any
}

const {
  Header, Footer, Sider, Content,
} = Layout;

const mapStateToProps = (state:any) => {
  console.log(state,'--------redux----state--home--')
  return {
    userInfo:state.userReducer.userInfo
  }
};
const mapDispatchToProps = {

}
class Home extends Component<Props,State>{
  public readonly state: Readonly<State> = {
    collapsed:false
  }
  componentDidMount(){
    console.log(this.props);
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  handleClick = (item:string)=>{
    console.log(this,'------------',store)
  }
  goHome = ()=>{
    this.props.history.push('/home')
  }
  render() {
    return (
      <div>
        <Layout id = "Main-wrap">
          <Sider
           trigger={null}
           collapsible
           collapsed={this.state.collapsed}>
            <div className="logo" onClick = {this.goHome}>
              <img src={logo} alt=""/>
              {!this.state.collapsed ? (<span>Antd-admin</span>):(<span></span>)}
            </div>
            <Navbar onChange = {this.handleClick} parentPath = {this.props.match.path}></Navbar>
          </Sider>
          <Layout>
            <Header className = "header">
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div style = {{float:'right',display:'inline-block'}}>
               <Avatar size={32} icon="user" src = {this.props.userInfo ? this.props.userInfo.avatar : ''}/>
               <span style = {{marginLeft:10,fontSize:12}}>{this.props.userInfo ? this.props.userInfo.name : '未知'}</span>
              </div>
              
            </Header>
            <Content>
              <Switch>
                <Route path={`${this.props.match.path}`} exact component={ChartsView} />
                <Route path={`${this.props.match.path}/compomemts/transtree`} component={TransferTree} />
                <Route path={`${this.props.match.path}/path3/:path`} exact component={ChartsView} />
              </Switch>
            </Content>  
          </Layout>
        </Layout>
      </div>
      // <div className="Home">
      //   <section className="Home-header">
      //     <aside className = "Home-menu">
      //       <Navbar onChange = {this.handleClick} parentPath = {this.props.match.path}></Navbar>
      //       {/* <Route path={this.props.match.path} exact component={Navbar} /> */}
      //     </aside>
      //     <main className="Home-main">
      //       <Switch>
      //         <Route path={`${this.props.match.path}`} exact component={ChartsView} />
      //         <Route path={`${this.props.match.path}/:path`} exact component={UserSettings} />
      //         <Route path={`${this.props.match.path}/path3/:path`} exact component={UserSettings} />
      //       </Switch>
      //     </main>
      //   </section>

      // </div>
    );
  }
}

// export default Home;
export default connect(mapStateToProps,mapDispatchToProps)(Home);
