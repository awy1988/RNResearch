import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';

export const fetchItemsAction = createAction(types.main.FETCH_ITEMS);
export const fetchItemsLoadMoreAction = createAction(types.main.FETCH_ITEMS_LOAD_MORE);
export const fetchItemsSuccessAction = createAction(types.main.FETCH_ITEMS_SUCCESS);
export const fetchItemsLoadMoreSuccessAction = createAction(types.main.FETCH_ITEMS_LOAD_MORE_SUCCESS);
export const fetchItemsAdvertisementAction = createAction(types.main.FETCH_ITEMS_ADVERTISEMENT);
export const fetchItemsAdvertisementSuccessAction = createAction(types.main.FETCH_ITEMS_ADVERTISEMENT_SUCCESS);
export const fetchItemsCategoriesAction = createAction(types.main.FETCH_ITEMS_CATEGORIES);
export const fetchItemsCategoriesSuccessAction = createAction(types.main.FETCH_ITEMS_CATEGORIES_SUCCESS);
