import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import ApiService from '../network/ApiService';
import ToastUtil from '../util/ToastUtil';
import {
  fetchItemsAdvertisementSuccessAction, fetchItemsCategoriesSuccessAction,
  fetchItemsLoadMoreSuccessAction,
  fetchItemsSuccessAction,
} from '../actions/mainActions';


function handleError(e) {
  return e.json();
}

export function* requestFetchItems(action) {
  // 取得首页商品列表
  try {
    const responseBody = yield call(ApiService.getItems, { province: action.payload.province, city: action.payload.city, location: [action.payload.longitude, action.payload.latitude] });
    yield put(fetchItemsSuccessAction({ items: responseBody.data, links: responseBody.links }));
  } catch (e) {
    const errorInfo = yield call(handleError, e);
    if (errorInfo && errorInfo.error && errorInfo.error.message) {
      ToastUtil.showToast(errorInfo.error.message);
    }
  }
}

export function* requestFetchItemsLoadMore(action) {
  // 首页商品列表加载更多
  try {
    const responseBody = yield call(ApiService.loadMore, action.payload.nextUrl);
    yield put(fetchItemsLoadMoreSuccessAction({ items: responseBody.data, links: responseBody.links }));
  } catch (e) {
    const errorInfo = yield call(handleError, e);
    if (errorInfo && errorInfo.error && errorInfo.error.message) {
      ToastUtil.showToast(errorInfo.error.message);
    }
  }
}

function* requestFetchItemsAdvertisement(action) {
  // 首页轮播广告
  try {
    const responseBody = yield call(ApiService.getAdvertisements, action.payload.status, action.payload.type);
    console.log(responseBody);
    yield put(fetchItemsAdvertisementSuccessAction({ advertisements: responseBody.data }));
  } catch (e) {
    console.log(e);
    const errorInfo = yield call(handleError, e);
    if (errorInfo && errorInfo.error && errorInfo.error.message) {
      ToastUtil.showToast(errorInfo.error.message);
    }
  }
}


function* requestFetchItemsCategories(action) {
  // 首页轮播广告
  try {
    const responseBody = yield call(ApiService.fetchItemCategories);
    console.log(responseBody);
    yield put(fetchItemsCategoriesSuccessAction({ categories: responseBody.data }));
  } catch (e) {
    const errorInfo = yield call(handleError, e);
    if (errorInfo && errorInfo.error && errorInfo.error.message) {
      ToastUtil.showToast(errorInfo.error.message);
    }
  }
}

export function* watchFetchItems() {
  yield takeEvery(types.main.FETCH_ITEMS, requestFetchItems);
}

export function* watchFetchItemsLoadMore() {
  yield takeEvery(types.main.FETCH_ITEMS_LOAD_MORE, requestFetchItemsLoadMore);
}

export function* watchFetchItemAdvertisement() {
  yield takeEvery(types.main.FETCH_ITEMS_ADVERTISEMENT, requestFetchItemsAdvertisement);
}

export function* watchFetchItemCategories() {
  yield takeEvery(types.main.FETCH_ITEMS_CATEGORIES, requestFetchItemsCategories);
}

