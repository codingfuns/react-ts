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
class Pie extends React.Component<Props,State>{
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
    let legend = this.props.value.map(_ => _.name)
    let option = {
      title: {
        text: this.props.text,
        subtext: this.props.subtext,
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: legend
      },
      series: [
        {
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: this.props.value,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
      this.setState({
        dom:echarts.init(this.state.element, 'tdTheme')
      }) 
      this.state.dom.setOption(option);
      on(window, 'resize', this.resize);
  }
  componentDidMount = ()=>{
    setTimeout(()=>{
      this.renderCharts()
    },1000)
    
  }

  render(){
    return (
      <div ref = {this.setTextInputRef} className="charts chart-pie" style = {this.props.style} ></div>
    ) 
  }
}

export default Pie