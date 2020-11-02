import * as T from '../types';

const handleLogin = (state:any = [], action:any) => {
  switch (action.type) {
    case 'TEST_ASYNC_PENDING':
    console.log(action.payload,'ing')
      return {
        ...state,
        testAsync: action.payload
      };
    case 'TEST_ASYNC_FULFILLED':
       console.log(action.payload,'success')
    default:
      return state;
  }
};


export default handleLogin;