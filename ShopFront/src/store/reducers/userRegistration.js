import { REG_USER, REG_USER_SUCCESS, REG_USER_FAIL } from "../actions/registrationUser";

const initialState = {
  statusErrors:[],
  userInfo:{},
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REG_USER: {
      return {
        ...state,
        statusErrors:[],
      }
    }
    case REG_USER_SUCCESS: {
      return {
        ...state,
        statusErrors:[],
        userInfo: action.payload.data,
      }
    }
    case REG_USER_FAIL: {
      return {
        ...state,
        statusErrors: action.payload,
        userInfo:{},
      }
    }
    default: {
      return state
    }
  }
}
