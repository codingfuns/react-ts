import React, { Component } from 'react';
import echarts from 'echarts';
import { on, off } from '../../../Libs/tools';
import tdTheme from './Theme.json';
echarts.registerTheme('tdTheme', tdTheme);

interface Props {
  style:any
}
interface State {
  dom:any,
  element:any
}
class StackChart extends React.Component<Props,State>{
  public readonly state:Readonly<State>={
    element:null,
    dom:null
  }
  static defaultProps:Props = {
    style:{
      height:'300px',
      width:'800px'
    }
  }
  setTextInputRef = (element:any)=>{
    this.setState({
      element:element,
      
    })
  }
  resize = ()=> {
    this.state.dom.resize()
  }
  renderCharts = ()=>{
    let option = {
      title: {
        text: '堆叠区域图'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: { normal: {} },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
      this.setState({
        dom:echarts.init(this.state.element, 'tdTheme')
      }) 
      // console.log(this.state.dom);
      this.state.dom.setOption(option);
      on(window, 'resize', this.resize);
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

export default StackChart