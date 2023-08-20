import {
    PROFILE_UPDATE,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAIL,
} from "../actions/profileUpdate";

const initialState = {
    statusErrorsUpdate: [],
    status:false,
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PROFILE_UPDATE: {
            return {
                ...state,
                statusErrorsUpdate: [],
                status:false,
            }
        }
        case PROFILE_UPDATE_SUCCESS: {
            return {
                ...state,
                statusErrorsUpdate: [],
                status:true,
            }
        }
        case PROFILE_UPDATE_FAIL: {
            return {
                ...state,
                statusErrorsUpdate: action.payload,
                status:false,
            }
        }
        default: {
            return state
        }
    }
}
