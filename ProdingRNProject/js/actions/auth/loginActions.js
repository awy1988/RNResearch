import {login} from '../../constants/ActionTypes';
import {createAction} from 'redux-actions';

// export const loginAction = (username, password) => ({
//   type:types.USER_LOGIN,
//   username:username,
//   password:password
// })
// 权限
export const loginAction = createAction(login.REQUEST_USER_LOGIN);
export const loginSuccessAction = createAction(login.REQUEST_USER_LOGIN_SUCCESS);
export const loginFailedAction = createAction(login.REQUEST_USER_LOGIN_FAILED);

// 验证码
export const loginCheckCaptchaAction = createAction(login.REQUEST_GET_CAPTCHA);
export const loginShowCaptchaAction = createAction(login.USER_LOGIN_SHOW_CAPTCHA);
export const loginExitAction = createAction(login.USER_LOGIN_EXIT);

