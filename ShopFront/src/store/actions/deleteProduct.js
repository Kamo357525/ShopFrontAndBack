export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export function deleteProduct(formData) {
    return {
        type: DELETE_PRODUCT,
        payload: formData,
    }
}