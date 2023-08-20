import {
    PROFILE_UPDATE,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAIL,
} from "../actions/profileUpdate";
import {GLOBAL_SET_USER} from "../actions/globalSetUser";
import {takeEvery, call, put, delay, } from 'redux-saga/effects';
import Api from "../../depenses/Api";


export default function* watcher() {
    yield takeEvery(PROFILE_UPDATE, handleProfileUpdate);
}

function* handleProfileUpdate(action) {
    try {
        const data = yield call(Api.profileUpdate, action.payload);
        yield put({
            type: PROFILE_UPDATE_SUCCESS,
            payload: data,
        })

        data.data.data.Token = window.localStorage.getItem('Token');

        yield put({
            type: GLOBAL_SET_USER,
            payload: {
                globalIsActive: true,
                globalUser: data.data,
            },
        })

    } catch (e) {
        yield put({
            type: PROFILE_UPDATE_FAIL,
            payload: e.response.data.errors
        })
    }
}
