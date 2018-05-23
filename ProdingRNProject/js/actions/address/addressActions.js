import { createAction } from 'redux-actions';
import * as types from '../../constants/ActionTypes';

export const fetchAddressListAction = createAction(types.address.FETCH_ADDRESS_LIST);
export const fetchAddressListCompleteAction = createAction(types.address.FETCH_ADDRESS_LIST_COMPLETE);
export const setDefaultAddressAction = createAction(types.address.SET_DEFAULT_ADDRESS);
export const openEditAddressAction = createAction(types.address.OPEN_ADDRESS_EDIT);
export const deleteAddressFromListAction = createAction(types.address.DELETE_ADDRESS_FROM_LIST);
export const deleteAddressFromEditAction = createAction(types.address.DELETE_ADDRESS_FROM_EDIT);
export const deleteAddressSuccessAction = createAction(types.address.DELETE_ADDRESS_SUCCESS);
export const selectContactAsConsignee = createAction(types.address.SELECT_CONTACT_AS_CONSIGNEE);
export const selectContactAsConsigneeComplete = createAction(types.address.SELECT_CONTACT_AS_CONSIGNEE_COMPLETE);
export const selectMapAddress = createAction(types.address.SELECT_MAP_ADDRESS);
export const selectMapAddressComplete = createAction(types.address.SELECT_MAP_ADDRESS_COMPLETE);
export const createAddressAction = createAction(types.address.CREATE_ADDRESS);
export const createAddressSuccessAction = createAction(types.address.CREATE_ADDRESS_SUCCESS);
export const updateAddressAction = createAction(types.address.UPDATE_ADDRESS);
export const updateAddressSuccessAction = createAction(types.address.UPDATE_ADDRESS_SUCCESS);
export const addressEditExitAction = createAction(types.address.ADDRESS_EDIT_EXIT);