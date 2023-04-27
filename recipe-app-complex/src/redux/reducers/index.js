import { combineReducers } from 'redux';
import login from './login';
import RecipePage from './RecipePage';
import recommend from './recommend';
import search from './search';

const rootReducer = combineReducers({
  login,
  search,
  recommend,
  RecipePage,
});

export default rootReducer;
