import * as types from '../../constants/ActionTypes';

const initialState = {
  addressList: [],
  selectedAddress: {
    name: '',
    mobile: '',
  },
  createAddressSuccess: false,
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
          ...state.selectedAddress,
          name: action.payload.contact.name,
          mobile: action.payload.contact.phone,
        },
      };
    case types.address.SELECT_MAP_ADDRESS_COMPLETE:
      return {
        ...state,
        selectedAddress: {
          ...state.selectedAddress,
          poiAddress: action.payload.poiAddress,
        },
      };
    case types.address.ADDRESS_EDIT_EXIT:
      return {
        ...state,
        createAddressSuccess: false,
        selectedAddress: initialState.selectedAddress,
      };
    case types.address.CREATE_ADDRESS_SUCCESS:
      return {
        ...state,
        createAddressSuccess: true,
      };
    case types.address.UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        createAddressSuccess: true,
      };
    default:
      break;
  }
  return state;
};

