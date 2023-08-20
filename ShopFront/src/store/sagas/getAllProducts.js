import {ALL_PRODUCTS, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL} from "../actions/getAllProducts";
import {takeEvery, call, put} from 'redux-saga/effects';
import Api from "../../depenses/Api";


export default function* watcher() {
    yield takeEvery(ALL_PRODUCTS, handleGetAllProducts);
}

function* handleGetAllProducts(action) {
    try {
        const data = yield call(Api.getAllProducts, action.payload);

        yield put({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data,
        })
    } catch (e) {
        yield put({
            type: ALL_PRODUCTS_FAIL,
            payload: e.response.data.errors
        })
    }
}
