import { takeEvery } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import _ from 'lodash';
import ContactsWrapper from 'react-native-contacts-wrapper';
import * as types from '../constants/ActionTypes';
import ApiService from '../network/ApiService';
import {
  fetchAddressListAction,
  fetchAddressListCompleteAction,
  selectContactAsConsigneeComplete,
} from '../actions/address/addressActions';
import ToastUtil from '../util/ToastUtil';


/* =============================================================================
 地址列表
============================================================================= */
export function* fetchAddressList(action) {
  // 获取地址列表
  try {
    const responseBody = yield call(ApiService.fetchAddressList, action.payload.userId);
    // 处理返回的数据，将默认地址放在列表的第一位
    const addressList = responseBody.data;
    const addressListSorted = _.sortBy(addressList, (address) => {
      return address.isDefault ? 0 : 1;
    });
    yield put(fetchAddressListCompleteAction({ addressList: addressListSorted }));
  } catch (e) {
    console.log(e);
    yield put(fetchAddressListCompleteAction({ addressList: [] }));
  }
}

export function* setDefaultAddress(action) {
  // 设定默认收货地址
  try {
    const responseBody = yield call(ApiService.updateUserAddress, action.payload.userId, action.payload.consigneeId, { isDefault: true });
    console.log(responseBody);
    ToastUtil.showToast('设置成功');
    yield fork(fetchAddressList, fetchAddressListAction({ userId: action.payload.userId }));
  } catch (e) {
    console.log(e);
  }
}


export function* watchFetchAddressList() {
  yield takeEvery(types.address.FETCH_ADDRESS_LIST, fetchAddressList);
}

export function* watchSetDefaultAddress() {
  yield takeEvery(types.address.SET_DEFAULT_ADDRESS, setDefaultAddress);
}

/* =============================================================================
 地址编辑
============================================================================= */

export function* selectContact(action) {
  try {
    // 选择联系人
    const contact = yield call(ContactsWrapper.getContact);
    console.log(contact);
    yield put(selectContactAsConsigneeComplete({ contact }));
  } catch (e) {
    console.log(e);
  }
}

export function* watchSelectContactAsConsignee() {
  yield takeEvery(types.address.SELECT_CONTACT_AS_CONSIGNEE, selectContact);
}
