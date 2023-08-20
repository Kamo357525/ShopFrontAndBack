import { ALL_PRODUCTS, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL } from "../actions/getAllProducts";


const initialState = {
    productList:[],
    count:0,
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ALL_PRODUCTS: {
            return {
                ...state,
            }
        }
        case ALL_PRODUCTS_SUCCESS: {
            return {
                ...state,
                productList: action.payload.data.data,
                count:action.payload.data.count,
            }
        }
        case ALL_PRODUCTS_FAIL: {
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
