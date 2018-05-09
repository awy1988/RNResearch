import { createAction } from 'redux-actions';
import * as types from '../../constants/ActionTypes';

export const fetchAddressListAction = createAction(types.address.FETCH_ADDRESS_LIST);
export const fetchAddressListCompleteAction = createAction(types.address.FETCH_ADDRESS_LIST_COMPLETE);
export const setDefaultAddressAction = createAction(types.address.SET_DEFAULT_ADDRESS);
export const deleteAddressAction = createAction(types.address.DELETE_ADDRESS);
