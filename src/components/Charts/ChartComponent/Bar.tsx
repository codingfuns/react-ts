import React, { Component } from 'react';
import echarts from 'echarts';
import { on, off } from '../../../Libs/tools'
import tdTheme from './Theme.json';
echarts.registerTheme('tdTheme', tdTheme);

interface Props {
  value: Array<any>,
  text: String,
  subtext: String,
  style:any
}
interface State {
  dom: any,
  element:any
}
class Bar extends React.Component<Props,State>{
  public readonly state:Readonly<State>={
    dom:null,
    element:null
  }
  static defaultProps:Props = {
    value: [],
    text: '',
    subtext: '',
    style:{
      height:'300px',
      width:'100%'
    }
  }
  setTextInputRef = (element:any)=>{
    this.setState({
      element:element
    })
  }
  resize = ()=> {
    this.state.dom.resize()
  }
  renderCharts = ()=>{
    let xAxisData = Object.keys(this.props.value)
    let seriesData = Object.values(this.props.value)
    let option = {
      title: {
        text: this.props.text,
        subtext: this.props.subtext,
        x: 'center'
      },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: seriesData,
        type: 'bar'
      }]
    }
      this.setState({
        dom:echarts.init(this.state.element, 'tdTheme')
      }) 
      // console.log(this.state.dom);
      this.state.dom.setOption(option);
      on(window, 'resize', this.resize)
  }
  componentDidMount = ()=>{
    // console.log(this)
    setTimeout(()=>{
      this.renderCharts()
    },1000)
    
  }

  render(){
    return (
      <div ref = {this.setTextInputRef} className="charts chart-bar" style = {this.props.style} ></div>
    ) 
  }
}

export default Bar