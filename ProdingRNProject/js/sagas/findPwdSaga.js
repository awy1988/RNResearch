import ToastUtil from "../util/ToastUtil";
import * as types from "../constants/ActionTypes";
import ApiService from "../network/ApiService";
import {takeEvery} from "redux-saga";
import {call, put} from "redux-saga/effects";
import {loginCheckCaptchaAction, loginShowCaptchaAction} from "../actions/auth/loginActions";
import {resetPwdFirstStepShowCaptchaAction} from "../actions/auth/resetPwdActions";

export function* requestCheckMobileAvailable(action) {
    try {
        const responseBody = yield call(ApiService.checkMobileAvailable, action.payload.mobile);
        if (responseBody.data) {
            // 手机号已注册,请求图形验证码
            yield put(loginCheckCaptchaAction({
                actionType:'reset-password',
                actionKey: action.payload.mobile
            }));

        } else {
            // 手机号未注册
            ToastUtil.showToast('该手机号尚未注册');
        }
    } catch(e) {
        // 出错，提示用户
        console.log('------------->requestCheckMobileAvailable catch!!');
        console.log(e);
    }

}


export function* requestCaptcha(action) {

    console.log('requestCaptcha in findPwd');

    try {
        const responseBody = yield call(ApiService.getCaptcha, action.payload.actionType, action.payload.actionKey);
        if (responseBody.data) {
            yield put(resetPwdFirstStepShowCaptchaAction({
                captchaUri:responseBody.data.base64,
                captchaHash:responseBody.data.hash
            }))
        }
    } catch (e) {
        // 验证码请求失败不需要做任何处理
    }

}

export function* watchCheckMobileAvailable() {
    yield takeEvery(types.findPassword.CHECK_MOBILE_AVAILABLE, requestCheckMobileAvailable);
}

export function* watchCaptcha() {
    yield takeEvery(types.login.REQUEST_GET_CAPTCHA, requestCaptcha);
}