import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import { systemStartupCompleteAction } from '../actions/SystemActions';


export function* systemStartup(action) {
  // 取得首页商品列表
  try {
    // TODO 这里有优化的空间，我们当前的做法是在欢迎页的最后一步发出startup Action，但是实际上我们的程序应该有一个入口画面，在这个入口画面进行startupAction的分发才对。startupAction主要处理跟启动相关的一些问题，比如，取得用户信息用于初始化 state 中的user这种事情。
    const userInfo = yield storage.load({ key: 'user' });
    yield put(systemStartupCompleteAction({ user: userInfo }));
  } catch (e) {
    // 从本地获取用户信息失败
    console.log(e);
    yield put(systemStartupCompleteAction({ user: {} }));
  }
}


export function* watchSystemStartup() {
  yield takeEvery(types.system.SYSTEM_START_UP, systemStartup);
}