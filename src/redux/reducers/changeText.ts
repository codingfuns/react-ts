import * as T from '../types';
import {BtnTextModel} from '../models';
import { handleActions } from 'redux-actions';
import ReduxState from './'
const initialState:BtnTextModel = {
  btnText: '登录',
};

const pageMainReducer = (state:any = initialState, action:any) => {
  switch (action.type) {
    case T.CHANGE_BTN_TEXT:
      return {
        ...state,
        btnText: action.payload
      };
    default:
      return state;
  }
};


export default pageMainReducer;