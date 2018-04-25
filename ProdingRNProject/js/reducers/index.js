import { combineReducers } from 'redux';
import login from './auth/loginReducer';
import resetPassword from './auth/resetPasswordReducer';
import main from './auth/mainReducer';

export default combineReducers({
  login, resetPassword, main,
});
