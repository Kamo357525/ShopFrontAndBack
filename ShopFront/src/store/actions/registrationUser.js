export const REG_USER = 'REG_USER';
export const REG_USER_SUCCESS = 'REG_USER_SUCCESS';
export const REG_USER_FAIL = 'REG_USER_FAIL';

export function registrationUser(formData) {
  return {
    type: REG_USER,
    payload: formData,
  }
}

