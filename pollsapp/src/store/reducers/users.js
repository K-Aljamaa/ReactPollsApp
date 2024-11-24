import { _getUsers } from '../../_DATA';
import { ADD_QUESTION } from './questions'; // Import the action type from questions reducer

const initialState = {};

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const UPDATE_USER_ANSWER = 'UPDATE_USER_ANSWER';

// Action creators
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

// Fetch users function - this is important and should remain
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
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: state[action.question.author].questions.concat([action.question.id])
        }
      };
    default:
      return state;
  }
}