import { applyMiddleware, createStore } from 'redux';
import tasksReducer from "./reducers/tasksReducer";
import logger from 'redux-logger'

const store = createStore(tasksReducer,
    applyMiddleware(logger));

export default store;