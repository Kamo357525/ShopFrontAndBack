import {GET_USER_PRODUCTS, GET_USER_PRODUCTS_SUCCESS, GET_USER_PRODUCTS_FAIL} from "../actions/getUserProducts";
import {takeEvery, call, put} from 'redux-saga/effects';
import Api from "../../depenses/Api";


export default function* watcher() {
    yield takeEvery(GET_USER_PRODUCTS, handleGetUserProducts);
}

function* handleGetUserProducts(action) {
    try {
        const data = yield call(Api.getUserProducts, action.payload);

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
