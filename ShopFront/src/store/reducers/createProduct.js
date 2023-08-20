import { CREATE_PRODUCT, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL } from "../actions/createProduct";

const initialState = {
    statusErrors:[],
    status:false,
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_PRODUCT: {
            return {
                ...state,
                statusErrors:[],
                status:false,
            }
        }
        case CREATE_PRODUCT_SUCCESS: {
            return {
                ...state,
                statusErrors:[],
                status:true,
            }
        }
        case CREATE_PRODUCT_FAIL: {
            return {
                ...state,
                statusErrors: action.payload,
                status:false,
            }
        }

        default: {
            return state
        }
    }
}
