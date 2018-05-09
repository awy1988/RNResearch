import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import _ from 'lodash';
import * as types from '../constants/ActionTypes';
import ApiService from '../network/ApiService';
import { fetchAddressListCompleteAction } from '../actions/address/addressActions';


export function* fetchAddressList(action) {
  // 获取地址列表
  try {
    const responseBody = yield call(ApiService.fetchAddressList, action.payload.userId);
    console.log(responseBody);
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

export function* watchFetchAddressList() {
  yield takeEvery(types.address.FETCH_ADDRESS_LIST, fetchAddressList);
}
