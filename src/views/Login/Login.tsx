import React, { Component } from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';
import {
  Form, Icon, Input, Button, Checkbox, 
} from 'antd';

import {changeBtnText,hanleLogin,saveUserInfo} from '../../redux/actions'
import {login,getUserInfo} from '../../api/user'
import {setToken} from '../../Libs/utils'
import { connect } from "react-redux";
import './Login.scss'
interface Props extends RouteComponentProps { }
interface Props extends FormComponentProps { 
  btnText ?: string,
  token ?:any
  changeText ?:any,
  hanleLogin?:any,
  saveUserInfo ?:any
}
interface State { }

// 映射store.getState()的数据到PageMain
const mapStateToProps = (state:any) => {
  console.log(state,'--------redux----state----')
  return {
    btnText: state.changeText.btnText
  };
};
// 映射使用了store.dispatch的函数到PageMain
// const mapDispatchToProps = (dispatch:any) => {
//   return {
//     changeText: (text:string) => {
//       dispatch(changeBtnText(text));
//     }
//   };
// };

// 这个地方也可以简写，react-redux会自动做处理
const mapDispatchToProps = {
  changeText: changeBtnText,
  hanleLogin:hanleLogin,
  saveUserInfo:saveUserInfo
};
//定义 增强功能的函数 把组件入参
const IronMan =(str:any) => (Component:any)=> {
  //定义 包装组件
   class IronManComponent extends React.Component<Props,State>{
       constructor(props:any){
           super(props)
       }
       handleSubmit = ()=>{
        
      }
      componentDidMount=()=>{
        console.log(this.props.btnText,'===========')
      }
       render(){
           //把传入的组件的props展开，这样就能把所有的窜见来props 继承过来
           return(<div>
               <Component {...this.props} />
               <p>现在我已经是钢铁侠了，准备打败灭霸{str}</p>
           </div>)
       }
   }
   //返回包装加强后的组件
   return IronManComponent
}
@IronMan('3333')
class NormalLoginForm extends React.Component<Props,State> {
  handleSubmit = (e:any) => {
    e.preventDefault();
    console.log(this)
    this.props.hanleLogin('测试异步redux');
    this.props.history.push('/home')
    this.props.form.validateFields((err:any, values:any) => {
      if (!err) {
        console.log('Received values of form: ', values);
        login(values).then((res:any)=>{
          console.log(res,'token')
          setToken(res.data.token);
          getUserInfo().then((info:any)=>{
            console.log(info,'userInfo');
            if(info.status === 200){
              this.props.saveUserInfo(info.data);
              this.props.history.push('/home')
            }
          })
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className = "Login">
        <div className = "Login-content" id = "components-form-demo-normal-login">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <a className="login-form-forgot" href="">Forgot password</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                {this.props.btnText}
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
      
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm);