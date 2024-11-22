
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import users from './reducers/users';
import questions from './reducers/questions';
import authUser from './reducers/authUser';

const rootReducer = combineReducers({
  users,
  questions,
  authUser
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;