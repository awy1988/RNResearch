import { takeEvery } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import _ from 'lodash';
import { NavigationActions } from 'react-navigation';
import ContactsWrapper from 'react-native-contacts-wrapper';
import * as types from '../constants/ActionTypes';
import ApiService from '../network/ApiService';

import {
  createAddressSuccessAction, deleteAddressSuccessAction,
  fetchAddressListAction,
  fetchAddressListCompleteAction,
  selectContactAsConsigneeComplete, updateAddressSuccessAction,
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
 地址创建、编辑
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

export function* selectMapAddress(action) {
  // 地图选址
  const navigateAction = NavigationActions.navigate({
    routeName: 'MapSearch',
  });
  yield action.payload.navigation.dispatch(navigateAction);
}

export function* createAddress(action) {
  // 新增收货地址,分为两步，第一步根据经纬度获取用户所选地址的省市码，第二步添加收货人信息
  try {
    const nearestCityResponseBody = yield call(ApiService.getNearestCity, action.payload.longitude, action.payload.latitude);
    const createAddressResponseBody = yield call(ApiService.createAddress, action.payload.userId, {
      name: action.payload.name,
      mobile: action.payload.mobile,
      province: nearestCityResponseBody.data.province,
      provinceName: action.payload.provinceName,
      city: nearestCityResponseBody.data.city,
      cityName: action.payload.cityName,
      district: nearestCityResponseBody.data.city,
      districtName: action.payload.districtName,
      address: action.payload.address,
      location: [action.payload.longitude, action.payload.latitude],
      isDefault: action.payload.isDefault,
    });
    yield put(createAddressSuccessAction({ addressInfo: createAddressResponseBody.data }));
    yield put(fetchAddressListAction({ userId: action.payload.userId }));
    ToastUtil.showToast('新建地址成功');
  } catch (e) {
    // TODO 异常处理
    console.log(e);
    e.json().then((ret) => {
      console.log(ret);
      if (ret.error && ret.error.message) {
        ToastUtil.showToast(ret.error.message);
      }
    });
  }
}

export function* updateAddress(action) {
  // 更新地址
  try {
    let nearestCityResponseBody;
    if (action.payload.longitude && action.payload.latitude) {
      nearestCityResponseBody = yield call(ApiService.getNearestCity, action.payload.longitude, action.payload.latitude);
    }

    let updateAddressBodyParams = {
      name: action.payload.name,
      mobile: action.payload.mobile,
      address: action.payload.address,
      isDefault: action.payload.isDefault,
    };
    if (nearestCityResponseBody && nearestCityResponseBody.data) {
      updateAddressBodyParams = {
        ...updateAddressBodyParams,
        province: nearestCityResponseBody.data.province,
        provinceName: action.payload.provinceName,
        city: nearestCityResponseBody.data.city,
        cityName: action.payload.cityName,
        district: nearestCityResponseBody.data.city,
        districtName: action.payload.districtName,
        location: [action.payload.longitude, action.payload.latitude],
      };
    }

    yield call(ApiService.updateAddress, action.payload.userId, action.payload.consigneeId, updateAddressBodyParams);

    yield put(updateAddressSuccessAction());
    yield put(fetchAddressListAction({ userId: action.payload.userId }));
    ToastUtil.showToast('编辑地址成功');
  } catch (e) {
    // TODO 异常处理
    console.log(e);
  }
}

export function* deleteAddressFromList(action) {
  try {
    yield call(ApiService.deleteAddress, action.payload.userId, action.payload.consigneeId);
    yield put(fetchAddressListAction({ userId: action.payload.userId }));
    ToastUtil.showToast('删除地址成功');
  } catch (e) {
    console.log(e);
  }
}

export function* deleteAddressFromEdit(action) {
  try {
    yield call(ApiService.deleteAddress, action.payload.userId, action.payload.consigneeId);
    yield put(deleteAddressSuccessAction());
    yield put(fetchAddressListAction({ userId: action.payload.userId }));
    ToastUtil.showToast('删除地址成功');
  } catch (e) {
    console.log(e);
  }
}


export function* watchSelectContactAsConsignee() {
  yield takeEvery(types.address.SELECT_CONTACT_AS_CONSIGNEE, selectContact);
}

export function* watchSelectMapAddress() {
  yield takeEvery(types.address.SELECT_MAP_ADDRESS, selectMapAddress);
}

export function* watchCreateAddress() {
  yield takeEvery(types.address.CREATE_ADDRESS, createAddress);
}

export function* watchUpdateAddress() {
  yield takeEvery(types.address.UPDATE_ADDRESS, updateAddress);
}

export function* watchDeleteAddressFromList() {
  yield takeEvery(types.address.DELETE_ADDRESS_FROM_LIST, deleteAddressFromList);
}

export function* watchDeleteAddressFromEdit() {
  yield takeEvery(types.address.DELETE_ADDRESS_FROM_EDIT, deleteAddressFromEdit);
}

