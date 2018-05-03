import 'core-js/es6/symbol';
// 登录
const login = {
  REQUEST_USER_LOGIN: Symbol('REQUEST_USER_LOGIN'),
  REQUEST_USER_LOGIN_SUCCESS: Symbol('REQUEST_USER_LOGIN_SUCCESS'),
  REQUEST_USER_LOGIN_FAILED: Symbol('REQUEST_USER_LOGIN_FAILED'),
  REQUEST_GET_CAPTCHA: Symbol('REQUEST_GET_CAPTCHA'),
  USER_LOGIN_SHOW_CAPTCHA: Symbol('USER_LOGIN_SHOW_CAPTCHA'),
  USER_LOGIN_EXIT: Symbol('USER_LOGIN_EXIT'),
};

// 找回密码
const resetPassword = {
  CHECK_MOBILE_AVAILABLE: Symbol('CHECK_MOBILE_AVAILABLE'),
  REQUEST_GET_CAPTCHA: Symbol('REQUEST_GET_CAPTCHA'),
  FETCH_MOBILE_VERIFICATION_CODE: Symbol('FETCH_MOBILE_VERIFICATION_CODE'),
  FETCH_MOBILE_VERIFICATION_CODE_SUCCESS: Symbol('FETCH_MOBILE_VERIFICATION_CODE_SUCCESS'),
  RESET_PWD_FIRST_STEP_SHOW_CAPTCHA: Symbol('RESET_PWD_FIRST_STEP_SHOW_CAPTCHA'),
  TO_SECOND_STEP: Symbol('TO_SECOND_STEP'),
  GET_V_CODE: Symbol('GET_V_CODE'),
  GET_V_CODE_SUCCESS: Symbol('GET_V_CODE_SUCCESS'),
  FETCH_MOBILE_VERIFICATION_CODE_SECOND_STEP: Symbol('FETCH_MOBILE_VERIFICATION_CODE_SECOND_STEP'),
  FETCH_MOBILE_VERIFICATION_CODE_SECOND_STEP_SUCCESS: Symbol('FETCH_MOBILE_VERIFICATION_CODE_SECOND_STEP_SUCCESS'),
};

const main = {
  FETCH_ITEMS: Symbol('FETCH_ITEMS'),
  FETCH_ITEMS_LOAD_MORE: Symbol('FETCH_ITEMS_LOAD_MORE'),
  FETCH_ITEMS_SUCCESS: Symbol('FETCH_ITEMS_SUCCESS'),
  FETCH_ITEMS_LOAD_MORE_SUCCESS: Symbol('FETCH_ITEMS_LOAD_MORE_SUCCESS'),
  FETCH_ITEMS_ADVERTISEMENT: Symbol('FETCH_ITEMS_ADVERTISEMENT'),
  FETCH_ITEMS_ADVERTISEMENT_SUCCESS: Symbol('FETCH_ITEMS_ADVERTISEMENT_SUCCESS'),
};

const user = {
  USER_INFO_UPDATE: Symbol('USER_INFO_UPDATE'),
};

const system = {
  SYSTEM_START_UP: Symbol('SYSTEM_START_UP'),
  SYSTEM_START_UP_COMPLETE: Symbol('SYSTEM_START_UP_COMPLETE'),
};

export { login, resetPassword, main, user, system };
