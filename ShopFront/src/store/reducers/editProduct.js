import { EDIT_PRODUCT, EDIT_PRODUCT_SUCCESS, EDIT_PRODUCT_FAIL } from "../actions/editProduct";

const initialState = {
    statusErrors:[],
    status:false,
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case EDIT_PRODUCT: {
            return {
                ...state,
                statusErrors:[],
                status:false,
            }
        }
        case EDIT_PRODUCT_SUCCESS: {
            return {
                ...state,
                statusErrors:[],
                status:true,
            }
        }
        case EDIT_PRODUCT_FAIL: {
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
