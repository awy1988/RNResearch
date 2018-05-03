import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';

export const systemStartupAction = createAction(types.system.SYSTEM_START_UP);
export const systemStartupCompleteAction = createAction(types.system.SYSTEM_START_UP_COMPLETE);
