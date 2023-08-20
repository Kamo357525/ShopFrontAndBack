export const PROFILE_UPDATE = 'PROFILE_UPDATE';
export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';
export const PROFILE_UPDATE_FAIL = 'PROFILE_UPDATE_FAIL';

export function updateProfile(formData) {
    return {
        type: PROFILE_UPDATE,
        payload: formData,
    }
}

