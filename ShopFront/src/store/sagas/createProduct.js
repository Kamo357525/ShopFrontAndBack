import {CREATE_PRODUCT, CREATE_PRODUCT_SUCCESS,CREATE_PRODUCT_FAIL} from "../actions/createProduct";
import { GLOBAL_SET_USER } from "../actions/globalSetUser";
import { takeEvery, call, put } from 'redux-saga/effects'
import Api from "../../depenses/Api";

export default function* watcher() {
    yield takeEvery(CREATE_PRODUCT, handleRegistration);
}

function* handleRegistration(action) {
    try {
        const  data  = yield call(Api.createProduct, action.payload);
        yield put({
            type: CREATE_PRODUCT_SUCCESS,
            payload:data,
        })

        data.data.data.Token=window.localStorage.getItem("Token");

        yield put({
            type:GLOBAL_SET_USER,
            payload:{
                globalIsActive:true,
                globalUser:data.data,
            },
        })
    } catch (e) {
        yield put({
            type: CREATE_PRODUCT_FAIL,
            payload: e.response.data.errors
        })
    }
}
