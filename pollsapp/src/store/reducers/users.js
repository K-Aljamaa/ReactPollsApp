import { _getUsers } from '../../_DATA';

const initialState = {};

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const UPDATE_USER_ANSWER = 'UPDATE_USER_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';

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
    case UPDATE_USER_ANSWER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer
          }
        }
      };
    case 'ADD_QUESTION':
      const { author, id } = action.question;
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(id)
        }
      };
    default:
      return state;
  }
}