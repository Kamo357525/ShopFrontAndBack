import {EDIT_PRODUCT, EDIT_PRODUCT_SUCCESS, EDIT_PRODUCT_FAIL} from "../actions/editProduct";
import {GET_USER_PRODUCTS_SUCCESS} from "../actions/getUserProducts";
import {takeEvery, call, put} from 'redux-saga/effects';
import Api from "../../depenses/Api";

export default function* watcher() {
    yield takeEvery(EDIT_PRODUCT, handleDeleteProduct);
}

function* handleDeleteProduct(action) {
    try {
        const data = yield call(Api.userProductsUpdate, action.payload);

        yield put({
            type: GET_USER_PRODUCTS_SUCCESS,
            payload: data,
        })
        yield put({
            type: EDIT_PRODUCT_SUCCESS,
        })

    } catch (e) {
        // console.log(e)
        yield put({
            type: EDIT_PRODUCT_FAIL,
            payload: e.response.data.errors
        })
    }
}
