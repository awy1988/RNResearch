import * as types from '../../constants/ActionTypes';

const initialState = {
  addressList: [],
  selectedAddress: {
    name: '',
    mobile: '',
  },
};


// reducer 中主要负责根据传入的 action 进行 state 的更新。也就是说，所有跟画面更新有关的状态变更都在 reducer 中完成
export default address = (state = initialState, action) => {
  switch (action.type) {
    case types.address.FETCH_ADDRESS_LIST_COMPLETE:
      return {
        ...state,
        addressList: action.payload.addressList,
      };
    case types.address.SELECT_CONTACT_AS_CONSIGNEE_COMPLETE:
      return {
        ...state,
        selectedAddress: {
          name: action.payload.contact.name,
          mobile: action.payload.contact.phone,
        },
      };
    default:
      break;
  }
  return state;
};

