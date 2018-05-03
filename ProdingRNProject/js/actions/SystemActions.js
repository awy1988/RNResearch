import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';

export const systemStartupAction = createAction(types.system.SYSTEM_START_UP);
export const systemStartupCompleteAction = createAction(types.system.SYSTEM_START_UP_COMPLETE);
export const fetchUserInfoAction = createAction(types.system.FETCH_USER_INFO);
export const fetchUserInfoCompleteAction = createAction(types.system.FETCH_USER_INFO_COMPLETE);
