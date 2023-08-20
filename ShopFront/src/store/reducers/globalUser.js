import {GLOBAL_SET_USER } from "../actions/globalSetUser";


const initialState = {
    globalIsActive:false,
    globalUser:{},
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GLOBAL_SET_USER: {
            return {
                ...state,
                globalIsActive:action.payload.globalIsActive,
                globalUser:action.payload.globalUser.data,
            }
        }
        default: {
            return state
        }
    }
}
