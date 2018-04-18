import * as types from '../constants/ActionTypes';
import {createAction} from 'redux-actions';

// export const loginAction = (username, password) => ({
//   type:types.USER_LOGIN,
//   username:username,
//   password:password
// })
// 权限
export const loginAction = createAction(types.REQUEST_USER_LOGIN);
export const loginSuccessAction = createAction(types.REQUEST_USER_LOGIN_SUCCESS);
export const loginFailedAction = createAction(types.REQUEST_USER_LOGIN_FAILED);

// 验证码
export const loginCheckCaptchaAction = createAction(types.REQUEST_GET_CAPTCHA);
export const loginShowCaptchaAction = createAction(types.USER_LOGIN_SHOW_CAPTCHA);
export const loginExitAction = createAction(types.USER_LOGIN_EXIT);

