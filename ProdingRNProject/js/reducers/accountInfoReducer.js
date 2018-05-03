import * as types from '../constants/ActionTypes';

const initialState = {

};


// reducer 中主要负责根据传入的 action 进行 state 的更新。也就是说，所有跟画面更新有关的状态变更都在 reducer 中完成
const user = (state = initialState, action) => {
  switch (action.type) {
    case types.user.USER_INFO_UPDATE:
      return {
        ...state,
        isLoading: true,
      };
    default:
      break;
  }
  return state;
};

