import { combineReducers } from 'redux';
import userReducer from './user-reducer.js';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
