
import { _getUsers } from '../../_DATA'; 

const initialState = {};

export const RECEIVE_USERS = 'RECEIVE_USERS';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

export function fetchUsers() {
  return (dispatch) => {
    return _getUsers().then((users) => {
      dispatch(receiveUsers(users));
    });
  };
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    default:
      return state;
  }
}