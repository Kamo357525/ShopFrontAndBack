export const ALL_PRODUCTS = 'ALL_PRODUCTS';
export const ALL_PRODUCTS_SUCCESS = 'ALL_PRODUCTS_SUCCESS';
export const ALL_PRODUCTS_FAIL = 'ALL_PRODUCTS_FAIL';

export function getAllProducts(pages) {
    return {
        type: ALL_PRODUCTS,
        payload:pages,
    }
}