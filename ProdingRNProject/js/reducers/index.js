import { combineReducers } from 'redux';
import login from './auth/loginReducer';
import resetPassword from './auth/resetPasswordReducer';
import main from './auth/mainReducer';
import user from './userInfoReducer';
import address from './address/addressReducer';

export default combineReducers({
  login, resetPassword, main, user, address,
});
