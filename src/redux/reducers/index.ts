import { combineReducers } from 'redux'
import changeText from './changeText'
import handlerLogin from './handleLogin'
import userReducer from './userReducer'

const reduser = combineReducers({
  changeText,handlerLogin,userReducer
})

export default reduser