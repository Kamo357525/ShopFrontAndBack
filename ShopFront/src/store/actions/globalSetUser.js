export const GLOBAL_SET_USER = 'GLOBAL_SET_USER';


export function globalSetUser(bool, data) {
    return {
        type: GLOBAL_SET_USER,
        payload:{
            globalIsActive:bool,
            globalUser:data,
        },
    }
}
