import * as T from '../types';
import { createAction } from 'redux-actions';
import {login, getUserInfo} from '../../api/user'
import {setToken} from '../../Libs/utils';
// export const changeBtnText = (text:any) => {
//   return {
//     type: T.CHANGE_BTN_TEXT,
//     payload: text
//   };
// };

/**
 * @description 使用 redux-actions 中间件，简化redux的使用
 */



export const changeBtnText = createAction(
  T.CHANGE_BTN_TEXT, 
  (text:string) => text
);
export const saveUserInfo = createAction(
  T.SAVE_USER_INFO,
  (res:any)=>res
)


export const hanleLogin  = (userInfo:any) =>(dispatch:any)=>{
  dispatch({
    type:T.TEST_ASYNC,
    payload: new Promise((resolve,reject)=>{
      // login(userInfo).then((res:any)=>{
      //   setToken(res.data.token);
      //   getUserInfo().then((res:any)=>{
      //     console.log(res);
      //     resolve(res)
      //   })
      // })
      setTimeout(()=>{
        resolve(userInfo)
      },3000)
    })
  })
}

