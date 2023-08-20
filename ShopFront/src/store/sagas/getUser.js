import {GET_USER, GET_USER_SUCCESS, GET_USER_FAIL} from "../actions/getUser";
import {takeEvery, call, put} from 'redux-saga/effects';
import Api from "../../depenses/Api";
import {GLOBAL_SET_USER} from "../actions/globalSetUser";

export default function* watcher() {
    yield takeEvery(GET_USER, handleGetUser);
}

function* handleGetUser(action) {
    try {
        const data = yield call(Api.getUser, action.payload);

        yield put({
            type: GET_USER_SUCCESS,
            payload: data,
        })

        window.localStorage.setItem("Token", data.data.Token);
        data.data.data.Token = data.data.Token;

        yield put({
            type: GLOBAL_SET_USER,
            payload: {
                globalIsActive: true,
                globalUser: data.data,
            },
        })
    } catch (e) {
        yield put({
            type: GET_USER_FAIL,
            payload: e.response.data.errors
        })
    }
}
