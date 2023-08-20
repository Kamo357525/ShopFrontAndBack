import {DELETE_PRODUCT} from "../actions/deleteProduct";
import {GET_USER_PRODUCTS_FAIL, GET_USER_PRODUCTS_SUCCESS} from "../actions/getUserProducts";
import {takeEvery, call, put} from 'redux-saga/effects';
import Api from "../../depenses/Api";

export default function* watcher() {
    yield takeEvery(DELETE_PRODUCT, handleDeleteProduct);
}

function* handleDeleteProduct(action) {
    try {
        const data = yield call(Api.userProductsDelete, action.payload);

        yield put({
            type: GET_USER_PRODUCTS_SUCCESS,
            payload: data,
        })
    } catch (e) {
        yield put({
            type: GET_USER_PRODUCTS_FAIL,
            payload: e.response.data.errors
        })
    }
}
