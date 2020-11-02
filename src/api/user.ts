import axios from '../Libs/api.request'
export const login = (userInfo:any) => {
  const data = userInfo;
  return axios.request({
    url: '/userlogin',
    data,
    method: 'post'
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: '/getUserInfo',
    method: 'get'
  })
}

export const getSprider = () =>{
  return axios.request({
    url: '/getSpiderData',
    method: 'get'
  })
}