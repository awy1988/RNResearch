import * as types from '../../constants/ActionTypes';
import {createAction} from 'redux-actions';


// 权限
export const checkMobileAvailableAction = createAction(types.findPassword.CHECK_MOBILE_AVAILABLE);
export const resetPwdFirstStepShowCaptchaAction = createAction(types.findPassword.FIND_PWD_FIRST_STEP_SHOW_CAPTCHA);
export const mobileAvailableAction = createAction(types.findPassword.MOBILE_AVAILABLE);
export const mobileUnavailableAction = createAction(types.findPassword.MOBILE_UNAVAILABLE);

