import {REG_USER, REG_USER_SUCCESS, REG_USER_FAIL} from "../actions/registrationUser";
import {GLOBAL_SET_USER} from "../actions/globalSetUser";
import {takeEvery, call, put} from 'redux-saga/effects'
import Api from "../../depenses/Api";

export default function* watcher() {
    yield takeEvery(REG_USER, handleRegistration);
}

function* handleRegistration(action) {
    try {
        const data = yield call(Api.registration, action.payload);
        yield put({
            type: REG_USER_SUCCESS,
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
            type: REG_USER_FAIL,
            payload: e.response.data.errors
        })
    }
}
