import { combineReducers } from 'redux';
import login from './auth/loginReducer';
import resetPassword from './auth/resetPasswordReducer';

export default combineReducers({
  login, resetPassword,
});
