import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import devicesReducer from './devicesReducer'; 

const store = combineReducers({
  user,
  login,
  devicesReducer
});

export default store;
