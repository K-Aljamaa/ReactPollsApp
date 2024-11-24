
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../../_DATA'; 

const initialState = {};

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function answerQuestion(authedUser, qid, answer) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  };
}

export function fetchQuestions() {
  return (dispatch) => {
    return _getQuestions().then((questions) => {
      dispatch(receiveQuestions(questions));
    });
  };
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return (dispatch) => {
    return _saveQuestion({ optionOneText, optionTwoText, author })
      .then((formattedQuestion) => {
        // Single dispatch that will be handled by both reducers
        dispatch(addQuestion(formattedQuestion));
      });
  };
}

export function handleAnswerQuestion(authedUser, qid, answer) {
  return (dispatch, getState) => {
    return _saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => {
        // Update both questions and users
        dispatch(answerQuestion(authedUser, qid, answer));
        // Dispatch action to update users
        dispatch({
          type: 'UPDATE_USER_ANSWER',
          authedUser,
          qid,
          answer
        });
      });
  };
}

export default function questions(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question
      };
    case ANSWER_QUESTION:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([action.authedUser])
          }
        }
      };
    default:
      return state;
  }
}