import { combineReducers } from 'redux';
import * as types from '../../constants/ActionTypes';

const firstStepInitialState = {
  showCaptcha: false,
  captchaUri: '',
  captchaHash: '',
};

const secondStepInitialState = {
  countdown: 0,
  captchaUri: '',
  captchaHash: '',
};

const thirdStepInitialState = {
  isLoading: false,
  isNeedCaptcha: false,
  isLoginSuccess: false,
  captchaUri: '',
  captchaHash: '',
  errorMessage: '',
};


// reducer 中主要负责根据传入的 action 进行 state 的更新。也就是说，所有跟画面更新有关的状态变更都在 reducer 中完成
// 找回密码第一步
const resetPasswordFirstStep = (state = firstStepInitialState, action) => {
  switch (action.type) {
    case types.resetPassword.RESET_PWD_FIRST_STEP_SHOW_CAPTCHA:
      return {
        ...state,
        showCaptcha: true,
        captchaUri: action.payload.captchaUri,
        captchaHash: action.payload.captchaHash,
      };

    case types.resetPassword.FETCH_MOBILE_VERIFICATION_CODE_SUCCESS:
      return {
        ...state,
        showCaptcha: false,
        fetchMobileVCodeSuccess: true,
      };
    case types.resetPassword.TO_SECOND_STEP:
      return firstStepInitialState;
    default:
      break;
  }
  return state;
};

// 找回密码第二步
const resetPasswordSecondStep = (state = secondStepInitialState, action) => {
  switch (action.type) {
    case types.resetPassword.GET_V_CODE_SUCCESS:
      return {
        ...state,
        countdown: action.payload.countdown,
      };
    default:
      break;
  }
  return state;
};

// 找回密码第三步
const resetPasswordThirdStep = (state = thirdStepInitialState, action) => {
  switch (action.type) {
    case types.resetPassword.CHECK_MOBILE_AVAILABLE:
      return {
        ...state,
        isLoading: true,
      };
    default:
      break;
  }
  return state;
};

export default combineReducers({
  resetPasswordFirstStep,
  resetPasswordSecondStep,
  resetPasswordThirdStep,
});

