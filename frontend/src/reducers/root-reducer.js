import { combineReducers } from 'redux';
import userReducer from './user-reducer.js';
import buildReducer from './current-build-reducer';

const rootReducer = combineReducers({
  user: userReducer,
  currentBuild: buildReducer,
});

export default rootReducer;
