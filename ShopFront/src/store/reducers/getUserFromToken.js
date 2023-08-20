import { GET_USER_FROM_TOKEN, GET_USER_FROM_TOKEN_SUCCESS, GET_USER_FROM_TOKEN_FAIL } from "../actions/getUserFromToken";


const initialState = {
    isActive:false,
    userInfoToken:{},
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_FROM_TOKEN: {
            return {
                ...state,
                isActive:false,
                userInfoToken:{},
            }
        }
        case GET_USER_FROM_TOKEN_SUCCESS: {
            return {
                ...state,
                isActive:true,
                userInfoToken: action.payload.data,
            }
        }
        case GET_USER_FROM_TOKEN_FAIL: {
            return {
                ...state,
                errorsUsersToken: action.payload,
                userInfoToken:{},
                isActive:false,
            }
        }
        default: {
            return state
        }
    }
}
