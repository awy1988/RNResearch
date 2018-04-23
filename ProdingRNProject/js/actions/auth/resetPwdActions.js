import * as types from '../../constants/ActionTypes';
import {createAction} from 'redux-actions';


// 找回密码第一步
export const checkMobileAvailableAction = createAction(types.resetPassword.CHECK_MOBILE_AVAILABLE);
export const getCaptchaAction = createAction(types.resetPassword.REQUEST_GET_CAPTCHA);
export const resetPwdFirstStepShowCaptchaAction = createAction(types.resetPassword.RESET_PWD_FIRST_STEP_SHOW_CAPTCHA);
export const fetchMobileVerificationCodeAction = createAction(types.resetPassword.FETCH_MOBILE_VERIFICATION_CODE);
export const fetchMobileVerificationCodeSuccessAction = createAction(types.resetPassword.FETCH_MOBILE_VERIFICATION_CODE_SUCCESS);
export const toSecondStepAction = createAction(types.resetPassword.TO_SECOND_STEP);


// 找回密码第二步
export const getMobileVCodeAction = createAction(types.resetPassword.GET_V_CODE);
export const getMobileVCodeSuccessAction = createAction(types.resetPassword.GET_V_CODE_SUCCESS);


// 找回密码第三步

