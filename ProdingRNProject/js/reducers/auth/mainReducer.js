import * as types from '../../constants/ActionTypes';

const initialState = {
  isLoading: false,
  items: [],
  links: {},
  advertisements: [],
};


// reducer 中主要负责根据传入的 action 进行 state 的更新。也就是说，所有跟画面更新有关的状态变更都在 reducer 中完成
export default main = (state = initialState, action) => {
  switch (action.type) {
    case types.main.FETCH_ITEMS:
      return {
        ...state,
        isLoading: true,
      };
    case types.main.FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload.items,
        links: action.payload.links,
      };
    case types.main.FETCH_ITEMS_LOAD_MORE_SUCCESS:
      return {
        ...state,
        items: state.items.concat(action.payload.items),
        links: action.payload.links,
      };
    case types.main.FETCH_ITEMS_ADVERTISEMENT_SUCCESS:
      return {
        ...state,
        advertisements: action.payload.advertisements,
      };
    case types.main.FETCH_ITEMS_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
      };
    default:
      break;
  }
  return state;
};

