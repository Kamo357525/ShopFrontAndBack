import { GET_USER_PRODUCTS, GET_USER_PRODUCTS_SUCCESS, GET_USER_PRODUCTS_FAIL } from "../actions/getUserProducts";


const initialState = {
    userProductList:[],
    count:0,
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_PRODUCTS: {
            return {
                ...state,
            }
        }
        case GET_USER_PRODUCTS_SUCCESS: {
            return {
                ...state,
                userProductList: action.payload.data.data,
                count:action.payload.data.count,
            }
        }
        case GET_USER_PRODUCTS_FAIL: {
            return {
                ...state,
                count:0,
            }
        }
        default: {
            return state
        }
    }
}
