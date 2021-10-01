import { applyMiddleware, createStore, combineReducers } from 'redux';
import tasksReducer from "./reducers/tasksReducer";
import userInfoReducer from './reducers/userInfoReducer';
import logger from 'redux-logger'


const reducers = combineReducers({ tasksReducer, userInfoReducer });
const store = createStore(reducers,
    applyMiddleware(logger));

export default store;