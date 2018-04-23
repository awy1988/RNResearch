import ToastUtil from "../util/ToastUtil";
import * as types from "../constants/ActionTypes";
import ApiService from "../network/ApiService";
import {takeEvery} from "redux-saga";
import {call, put} from "redux-saga/effects";
import {
    fetchMobileVerificationCodeSuccessAction,
    getCaptchaAction,
    resetPwdFirstStepShowCaptchaAction
} from "../actions/auth/resetPwdActions";


function handleError(e) {
    return e.json();
}

// 验证手机号是否可用
export function* requestCheckMobileAvailable(action) {
    try {
        const responseBody = yield call(ApiService.checkMobileAvailable, action.payload.mobile);
        if (responseBody.data) {
            // 手机号已注册,请求图形验证码
            yield put(getCaptchaAction({
                actionType:'reset-password',
                actionKey: action.payload.mobile
            }));

        } else {
            // 手机号未注册
            ToastUtil.showToast('该手机号尚未注册');
        }
    } catch(e) {
        // 出错，提示用户
        const errorInfo = yield call(e.json());
        if (errorInfo && errorInfo.error && errorInfo.error.message) {
            ToastUtil.showToast(errorInfo.error.message);
        }
    }

}

// 获取图形验证码
function* requestCaptcha(action) {

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

// 获取手机短信验证码
export function* requestMobileVerificationCode(action) {
    try {
        const responseBody = yield call(ApiService.getMobileVerificationCode, action.payload.mobile, action.payload.captchaText, action.payload.captchaHash, action.payload.purpose, action.payload.type);
        yield put(fetchMobileVerificationCodeSuccessAction());
    } catch(e) {
        console.log(e);
        const errorInfo = yield call(handleError, e);
        if (errorInfo && errorInfo.error && errorInfo.error.message) {
            ToastUtil.showToast(errorInfo.error.message);
        }
        console.log(errorInfo);
        // 如果获取手机验证码出错，则重新刷新验证码
        yield put(getCaptchaAction({
            actionType:'reset-password',
            actionKey: action.payload.mobile
        }));
    }
}

export function* watchCheckMobileAvailable() {
    yield takeEvery(types.resetPassword.CHECK_MOBILE_AVAILABLE, requestCheckMobileAvailable);
}

export function* watchCaptchaRefresh() {
    yield takeEvery(types.resetPassword.REQUEST_GET_CAPTCHA, requestCaptcha);
}

export function* watchFetchMobileVerificationCode() {
    yield takeEvery(types.resetPassword.FETCH_MOBILE_VERIFICATION_CODE, requestMobileVerificationCode);
}