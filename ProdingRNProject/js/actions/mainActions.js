import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';

export const fetchItemsAction = createAction(types.main.FETCH_ITEMS);
export const fetchItemsLoadMoreAction = createAction(types.main.FETCH_ITEMS_LOAD_MORE);
export const fetchItemsSuccessAction = createAction(types.main.FETCH_ITEMS_SUCCESS);
export const fetchItemsLoadMoreSuccessAction = createAction(types.main.FETCH_ITEMS_LOAD_MORE_SUCCESS);
