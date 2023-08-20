import {GET_USER_FROM_TOKEN, GET_USER_FROM_TOKEN_SUCCESS, GET_USER_FROM_TOKEN_FAIL} from "../actions/getUserFromToken";
import {takeEvery, call, put} from 'redux-saga/effects';
import Api from "../../depenses/Api";
import {GLOBAL_SET_USER} from "../actions/globalSetUser";

export default function* watcher() {
    yield takeEvery(GET_USER_FROM_TOKEN, handleGetUserFromToken);
}

function* handleGetUserFromToken(action) {
    try {
        const data = yield call(Api.getUserFromToken, action.payload);

        yield put({
            type: GET_USER_FROM_TOKEN_SUCCESS,
            payload: data,
        })

        data.data.data.Token = action.payload;

        yield put({
            type: GLOBAL_SET_USER,
            payload: {
                globalIsActive: true,
                globalUser: data.data,
            },
        })

    } catch (e) {
        yield put({
            type: GET_USER_FROM_TOKEN_FAIL,
            payload: e.response.data.errors
        })
    }
}
