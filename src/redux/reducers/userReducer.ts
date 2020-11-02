import * as T from '../types';

const initialState = {
  userInfo:null
}
const userReducer = (state:any = initialState, action:any) => {
  switch (action.type) {
    case T.SAVE_USER_INFO:
    console.log(action.payload,'payload')
      return {
        ...state,
        userInfo: action.payload
      };
    default:
      return state;
  }
};


export default userReducer;