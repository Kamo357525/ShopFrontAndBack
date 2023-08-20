export const GET_USER_PRODUCTS = 'GET_USER_PRODUCTS';
export const GET_USER_PRODUCTS_SUCCESS = 'GET_USER_PRODUCTS_SUCCESS';
export const GET_USER_PRODUCTS_FAIL = 'GET_USER_PRODUCTS_FAIL';

export function getUserProducts(pages) {
    return {
        type: GET_USER_PRODUCTS,
        payload:pages,
    }
}