import * as types from '../../constants/ActionTypes';
import {createAction} from 'redux-actions';


// 权限
export const checkMobileAvailableAction = createAction(types.resetPassword.CHECK_MOBILE_AVAILABLE);
export const getCaptchaAction = createAction(types.resetPassword.REQUEST_GET_CAPTCHA);
export const resetPwdFirstStepShowCaptchaAction = createAction(types.resetPassword.RESET_PWD_FIRST_STEP_SHOW_CAPTCHA);
export const fetchMobileVerificationCodeAction = createAction(types.resetPassword.FETCH_MOBILE_VERIFICATION_CODE);
export const fetchMobileVerificationCodeSuccessAction = createAction(types.resetPassword.FETCH_MOBILE_VERIFICATION_CODE_SUCCESS);
export const toSecondStepAction = createAction(types.resetPassword.TO_SECOND_STEP);

