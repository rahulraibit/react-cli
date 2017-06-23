import { combineReducers } from 'redux'
import userinfo from './UserinfoReducer';

let reducers = {
  userinfo
};

const rootReducer = combineReducers(reducers);

export default rootReducer





