import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import devicesReducer from './devicesReducer'; 
import splReducer from './splReducer'; 

const store = combineReducers({
  user,
  login,
  devicesReducer,
  splReducer
});

export default store;
