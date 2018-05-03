import * as types from '../constants/ActionTypes';

const initialState = {

};


// reducer 中主要负责根据传入的 action 进行 state 的更新。也就是说，所有跟画面更新有关的状态变更都在 reducer 中完成
const user = (state = initialState, action) => {
  switch (action.type) {
    case types.login.REQUEST_USER_LOGIN_SUCCESS:// 登录成功后，需要在store中存储user信息
      return {
        ...state,
        ...action.payload,
      };
    case types.system.SYSTEM_START_UP_COMPLETE:
      return {
        ...state,
        ...action.payload.user, // 此时payload为 {user:{...}}
      };
    case types.system.FETCH_USER_INFO_COMPLETE: // 更新用户信息结束
      return {
        ...state,
        ...action.payload,
      };
    default:
      break;
  }
  return state;
};

export default user;

