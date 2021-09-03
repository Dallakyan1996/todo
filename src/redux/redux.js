import { createStore } from 'redux';
import tasksReducer from "./reducers/tasksReducer";

const store = createStore(tasksReducer);

export default store;