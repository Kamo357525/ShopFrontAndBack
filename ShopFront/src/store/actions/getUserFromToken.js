export const GET_USER_FROM_TOKEN = 'GET_USER_FROM_TOKEN';
export const GET_USER_FROM_TOKEN_SUCCESS = 'GET_USER_FROM_TOKEN_SUCCESS';
export const GET_USER_FROM_TOKEN_FAIL = 'GET_USER_FROM_TOKEN_FAIL';

export function getUserFromToken(token) {
    return {
        type: GET_USER_FROM_TOKEN,
        payload: token,
    }
}

