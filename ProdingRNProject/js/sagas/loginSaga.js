import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import ApiService from '../network/ApiService';
import LoginService from '../services/LoginService';
import {
  loginCheckCaptchaAction,
  loginFailedAction,
  loginShowCaptchaAction,
  loginSuccessAction,
} from '../actions/auth/loginActions';


function handleError(e) {
  return e.json();
}

export function* requestUserLogin(action) {
  // 在 saga 中封装业务逻辑
  try {
    const responseBody = yield call(ApiService.login, action.payload.username, action.payload.password, action.payload.captcha, action.payload.captchaHash);
    LoginService.saveUserInfo(responseBody.data);
    LoginService.saveToken(responseBody.data.accessToken);

    yield put(loginSuccessAction(responseBody.data));
  } catch (e) {
    const errorInfo = yield call(handleError, e);
    if (errorInfo && errorInfo.error && errorInfo.error.message) {
      yield put(loginFailedAction({ errorMessage: errorInfo.error.message }));
    } else {
      yield put(loginFailedAction());
    }
    yield put(loginCheckCaptchaAction({
      actionType: 'signing-in',
      actionKey: action.payload.username,
    }));
  }
}

export function* requestCaptcha(action) {
  console.log('requestCaptcha in login');
  try {
    const responseBody = yield call(ApiService.getCaptcha, action.payload.actionType, action.payload.actionKey);
    if (responseBody.data) {
      yield put(loginShowCaptchaAction({
        captchaUri: responseBody.data.base64,
        captchaHash: responseBody.data.hash,
      }));
    }
  } catch (e) {
    // 验证码请求失败不需要做任何处理
  }
}

export function* watchLogin() {
  yield takeEvery(types.login.REQUEST_USER_LOGIN, requestUserLogin);
}

export function* watchCaptcha() {
  yield takeEvery(types.login.REQUEST_GET_CAPTCHA, requestCaptcha);
}
