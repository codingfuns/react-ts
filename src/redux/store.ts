import { createStore, applyMiddleware  } from 'redux'
import reduser from './reducers'
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
let store = createStore(reduser,applyMiddleware(thunk,promiseMiddleware));
export default store