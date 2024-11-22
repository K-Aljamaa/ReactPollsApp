
const initialState = null;

export const SET_AUTH_USER = 'SET_AUTH_USER';
export const UNSET_AUTH_USER = 'UNSET_AUTH_USER';

export function setAuthUser(userId) {
  return {
    type: SET_AUTH_USER,
    userId
  };
}

export function unsetAuthUser() {
  return {
    type: UNSET_AUTH_USER
  };
}

export default function authUser(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_USER:
      return action.userId;
    case UNSET_AUTH_USER:
      return null;
    default:
      return state;
  }
}