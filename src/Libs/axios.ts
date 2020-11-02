import axios from 'axios'
import {getToken} from './utils'
// import { Spin } from 'iview'
// const addErrorLog = (errorInfo:any) => {
//   const { statusText, status, request: { responseURL } } = errorInfo
//   let info = {
//     type: 'ajax',
//     code: status,
//     mes: statusText,
//     url: responseURL
//   }
//   if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
// }

class HttpRequest {
  baseUrl:string;
  queue:any;
  constructor (baseUrl:string) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Authorization':getToken()
      }
    }
    return config
  }
  destroy (url:string) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance:any, url:string) {
    // 请求拦截
    instance.interceptors.request.use((config:any) => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, (error:any) => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use((res:any) => {
      this.destroy(url)
      const { data, status } = res
      return { data, status }
    }, (error:any) => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      // addErrorLog(errorInfo)
      return Promise.reject(error)
    })
  }
  request (options:any) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    console.log(options,'requestOption')
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
