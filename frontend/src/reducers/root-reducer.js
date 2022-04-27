import { combineReducers } from 'redux';
import userReducer from './user-reducer.js';
import buildReducer from './builds-reducer';
import categoriesReducer from './categories-reducer';

const rootReducer = combineReducers({
  user: userReducer,
  builds: buildReducer,
  categories: categoriesReducer,
});

export default rootReducer;
