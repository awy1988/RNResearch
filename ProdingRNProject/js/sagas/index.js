import * as types from "../constants/ActionTypes";
import {takeEvery} from "redux-saga";
import {put, call} from "redux-saga/effects";
import {
    loginFailedAction,
    loginSuccessAction,
    loginAction,
    loginCheckCaptchaAction,
    loginShowCaptchaAction
} from "../actions";
import ApiService from "../network/ApiService";
import LoginService from "../services/LoginService";


function handleError(e) {
    return e.json();
}

export function* requestUserLogin(action) {
    // 在 saga 中封装业务逻辑
    try {
        const responseBody = yield call(ApiService.login,action.payload.username, action.payload.password, action.payload.captcha, action.payload.captchaHash);
        console.log(responseBody);
        LoginService.saveUserInfo(responseBody.data);
        LoginService.saveToken(responseBody.data.accessToken);

        yield put(loginSuccessAction());
    }catch (e) {
        console.log('loginFailed-----');
        console.log(e);
        const errorInfo = yield call(handleError,e);
        if (errorInfo && errorInfo.error && errorInfo.error.message) {
            yield put(loginFailedAction({errorMessage: errorInfo.error.message}));
        } else {
            yield put(loginFailedAction());
        }
        yield put(loginCheckCaptchaAction({
            actionType:'signing-in',
            actionKey:action.payload.username
        }));



    }

}

export function* requestCaptcha(action) {
    console.log('requestCaptcha in ---->');
    console.log(action);
    try {
        const responseBody = yield call(ApiService.getCaptcha, action.payload.actionType, action.payload.actionKey);
        console.log(responseBody);
        if (responseBody.data) {
            yield put(loginShowCaptchaAction({
                captchaUri:responseBody.data.base64,
                captchaHash:responseBody.data.hash
            }))
        }
    } catch (e) {
        // 验证码请求失败不需要做任何处理
    }


}

export function* watchLogin() {
    yield takeEvery(types.REQUEST_USER_LOGIN, requestUserLogin);
}

export function* watchCaptcha() {
    yield takeEvery(types.REQUEST_GET_CAPTCHA, requestCaptcha);
}

export default function* rootSaga() {
    yield [
        watchLogin(),
        watchCaptcha()
    ]
}