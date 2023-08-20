import { GET_USER, GET_USER_SUCCESS, GET_USER_FAIL } from "../actions/getUser";

const initialState = {
    statusErrorsLogin:[],
    userInfoLogin:{},
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER: {
            return {
                ...state,
                statusErrorsLogin:[],
                userInfoLogin:{},
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                statusErrorsLogin:[],
                userInfoLogin: action.payload.data,
            }
        }
        case GET_USER_FAIL: {
            return {
                ...state,
                statusErrorsLogin: action.payload,
                userInfo:{},
            }
        }
        default: {
            return state
        }
    }
}
